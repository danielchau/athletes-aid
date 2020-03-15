import express from "express";
import path from "path";
import bodyParser from "body-parser";
import * as multer from "multer";
import passport from "passport";
import * as saml from "passport-saml";
import * as fs from "fs";
import cookieParser from "cookie-parser";
import session from 'express-session';

var storage = multer.memoryStorage();
var upload = multer.default({ storage: storage });

//paths
const DIST_DIR = path.join(__dirname, "../dist"); // NEW
const HTML_FILE = path.join(DIST_DIR, "index.html"); // NEW
const ATHLETE_CSV = path.join(DIST_DIR, "athleteBulkTemplate.csv");

var SamlStrategy :any  = new saml.Strategy(
  {
    path: "/login/callback",
    entryPoint: "https://authentication.stg.id.ubc.ca",
    issuer: "passport-saml",

    logoutUrl: "https://authentication.ubc.ca/idp/profile/SAML2/POST/SLO",

    // Service Provider private key
    decryptionPvk: fs.readFileSync(__dirname + "/cert/key.pem", "utf8"),
    // Identity Provider's public key
    cert: fs.readFileSync(__dirname + "/cert/cert_idp.pem", "utf8")
  },
  function(profile: any, done: any): any {
    console.log(profile);
  }
)

passport.use(
  SamlStrategy
);

const app = express();

app.set("port", process.env.PORT || 3000);
app.use(express.static(DIST_DIR)); // NEW
app.use(bodyParser.json({ limit: "5mb" }));
app.use(cookieParser());
app.use(bodyParser());
app.use(session({secret: "hello"}));
app.use(passport.initialize());
app.use(passport.session());

app.get("/athleteTemplate", function(req, res) {
  res.download(ATHLETE_CSV);
});

//login stuff

function ensureAuthenticated(req: { isAuthenticated: () => any; }, res: { redirect: (arg0: string) => any; }, next: () => any) {
  if (req.isAuthenticated())
    return next();
  else
    return res.redirect('/login');
}

app.get('/',
  ensureAuthenticated, 
  function(req, res) {
    res.send('Authenticated');
  }
);

app.get('/login',
  passport.authenticate('saml', { failureRedirect: '/login/fail' }),
  function (req, res) {
    res.redirect('/');
  }
);

app.post('/login/callback',
   passport.authenticate('saml', { failureRedirect: '/login/fail' }),
  function(req, res) {
    res.redirect('/');
  }
);

app.get('/login/fail', 
  function(req, res) {
    res.status(401).send('Login failed');
  }
);

app.get('/metadata', 
  function(req, res) {
    const decryptionCert = fs.readFileSync(__dirname + '/cert/cert.pem', 'utf8');
    res.type('application/xml');
    res.status(200).send(SamlStrategy.generateServiceProviderMetadata(decryptionCert));
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
