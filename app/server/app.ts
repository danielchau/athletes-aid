import express from "express";
import path from "path";
import bodyParser from "body-parser";
import * as multer from "multer";
import * as passport from "passport";
import * as saml from "passport-saml";
import * as fs from "fs";

var storage = multer.memoryStorage();
var upload = multer.default({ storage: storage });

//paths
const DIST_DIR = path.join(__dirname, "../dist"); // NEW
const HTML_FILE = path.join(DIST_DIR, "index.html"); // NEW
const ATHLETE_CSV = path.join(DIST_DIR, "athleteBulkTemplate.csv");

var SamlStrategy = saml.Strategy;

passport.use(
  new SamlStrategy(
    {
      path: "/login/callback",
      entryPoint: "https://authentication.stg.id.ubc.ca",
      issuer: "passport-saml",

      logoutUrl: "https://authentication.ubc.ca/idp/profile/SAML2/POST/SLO",

      // Service Provider private key
      decryptionPvk: fs.readFileSync(__dirname + "/cert/key.pem", "utf8"),
      // Service Provider Certificate
      privateCert: fs.readFileSync(__dirname + "/cert/cert.pem", "utf8"),
      // Identity Provider's public key
      cert: fs.readFileSync(__dirname + "/cert/cert_idp.pem", "utf8")
    },
    function(profile: any, done: any): any {
      console.log(profile);
    }
  )
);

const app = express();

app.set("port", process.env.PORT || 3000);
app.use(express.static(DIST_DIR)); // NEW
app.use(bodyParser.json({ limit: "5mb" }));

app.get("/athleteTemplate", function(req, res) {
  res.download(ATHLETE_CSV);
});

//login stuff

app.post(
  "/login/callback",
  bodyParser.urlencoded({ extended: false }),
  passport.authenticate("saml", { failureRedirect: "/", failureFlash: true }),
  function(req, res) {
    res.redirect("/");
  }
);

app.get(
  "/login",
  passport.authenticate("saml", { failureRedirect: "/", failureFlash: true }),
  function(req, res) {
    res.redirect("/");
  }
);

// Controllers (route handlers)
import * as teamController from "./controllers/team";

app.post("/team", teamController.postTeam);
app.get("/team", teamController.getTeam);
app.put("/team", teamController.modifyTeam);
app.delete("/team", teamController.deleteTeam);
app.get("/teams", teamController.getAllTeams);

// import * as userController from "./controllers/user";

import * as injuryController from "./controllers/injury";
app.post("/singleInjury", injuryController.postInjury);
app.get("/singleInjury", injuryController.getInjury);
app.post("/injuryNote", injuryController.postInjuryNote);
app.get("/injuriesInDateRange", injuryController.getInjuriesByRange);
app.post("/injuryActive", injuryController.setActive);
app.put("/singleInjury", injuryController.updateInjury);

import * as athleteController from "./controllers/athlete";
app.post("/athlete", athleteController.postAthlete);
app.get("/athlete", athleteController.getAthlete);
app.put("/athlete", athleteController.putAthlete);
app.get("/allAthletes", athleteController.getAllAthletes);
app.post("/file", upload.single("fileUpload"), athleteController.postFile);
app.get("/file", athleteController.getFile);
app.delete("/file", athleteController.deleteFile);

// Routes
app.get("/*", (req, res) => {
  res.sendFile(HTML_FILE); // EDIT
});

export default app;
