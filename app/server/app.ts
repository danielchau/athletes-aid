import express from "express";
import path from "path";
import bodyParser from "body-parser";
import * as multer from "multer";
import passport from "passport";
import * as saml from "passport-saml";
import * as fs from "fs";
import session from "express-session";
import * as userModel from "./models/user";
import { User } from "./models/schema/User";

var storage = multer.memoryStorage();
var upload = multer.default({ storage: storage });

//paths
const DIST_DIR = path.join(__dirname, "../dist"); // NEW
const HTML_FILE = path.join(DIST_DIR, "index.html"); // NEW
const ATHLETE_CSV = path.join(DIST_DIR, "athleteBulkTemplate.csv");

//import * as userController from "./controllers/user";

var SamlStrategy: any = new saml.Strategy(
  {
    issuer: "https://athletes-aid.ca",
    host: "athletes-aid.ca",
    protocol: "https://",
    signatureAlgorithm: "sha256",

    path: "/login/callback",
    authnContext:
      "urn:oasis:names:tc:SAML:2.0:ac:classes:PasswordProtectedTransport",
    entryPoint:
      "https://authentication.stg.id.ubc.ca/idp/profile/SAML2/Redirect/SSO",

    logoutUrl: "https://authentication.stg.id.ubc.ca/idp/profile/Logout",
    logoutCallbackUrl: "https://athletes-aid.ca/",

    decryptionPvk: fs.readFileSync(__dirname + "/cert/key.pem", "utf8"),
    cert: fs.readFileSync(__dirname + "/cert/cert_idp.pem", "utf8"),

    identifierFormat: "urn:oasis:names:tc:SAML:1.1:nameid-format:unspecified"
  },
  async function(profile: any, done: any): Promise<any> {
    profile.cwl = profile["urn:oid:0.9.2342.19200300.100.1.1"];
    profile.firstName = profile["urn:oid:2.5.4.42"];
    profile.lastName = profile["urn:oid:2.5.4.4"];
    profile.email = profile["urn:oid:0.9.2342.19200300.100.1.3"];
    try {
      let user: User = await userModel.getUser(profile.cwl);
      profile.role = user.role;

      if (user.firstName == undefined && user.lastName == undefined) {
        user.firstName = profile.firstName;
        user.lastName = profile.lastName;
        await userModel.updateUser(user);
      }

      return done(null, profile);
    } catch (e) {
      return done(null, false, {
        message: "User does not exist"
      });
    }
  }
);

passport.use("saml", SamlStrategy);

const app = express();

app.set("port", process.env.PORT || 3000);
app.use(express.static(DIST_DIR)); // NEW
app.use(bodyParser.json({ limit: "5mb" }));
app.use(bodyParser());
app.use(bodyParser.urlencoded({ extended: false }));
//app.use(cookieParser());
app.use(
  session({
    secret: "hello",
    resave: false,
    saveUninitialized: true
  })
);
app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(user, done) {
  done(null, user);
});

app.get("/athleteTemplate", ensureAuthenticated, function(_req, res) {
  res.download(ATHLETE_CSV);
});

function ensureAuthenticated(
  req: { isAuthenticated: () => any },
  res: { redirect: (arg0: string) => any },
  next: () => any
) {
  if (req.isAuthenticated()) return next();
  else return res.redirect("/login");
}

app.get(
  "/login",
  passport.authenticate("saml", { failureRedirect: "/login/fail" }),
  function(_req, res) {
    res.redirect("/");
  }
);

app.post(
  "/login/callback",
  passport.authenticate("saml", { failureRedirect: "/login/fail" }),
  function(_req, res) {
    res.redirect("/");
  }
);

app.get("/login/fail", function(_req, res) {
  console.log("Login failed");
  res.status(401).send("Login failed");
});

app.get("/logout", function(req, res) {
  req.user = req.session.passport.user;

  return SamlStrategy.logout(req, function(_err: any, _requestUrl: any) {
    console.log(req);
    req.logout();
    req.session.destroy(function(err) {
      res.redirect(_requestUrl);
    });
  });
});

app.get("/metadata", function(_req, res) {
  //const decryptionCert = fs.readFileSync(__dirname + "/cert/cert.pem", "utf8");

  //const metadata = SamlStrategy.generateServiceProviderMetadata(decryptionCert);
  const metadata = fs.readFileSync(__dirname + "/metadata.xml", "utf8");

  res.type("application/xml");
  res.status(200).send(metadata);
});

// Controllers (route handlers)
import * as teamController from "./controllers/team";

app.post("/team", ensureAuthenticated, teamController.postTeam);
app.get("/team", ensureAuthenticated, teamController.getTeam);
app.put("/team", ensureAuthenticated, teamController.modifyTeam);
app.delete("/team", ensureAuthenticated, teamController.deleteTeam);
app.get("/teams", ensureAuthenticated, teamController.getAllTeams);

import * as userController from "./controllers/user";

app.post("/user", ensureAuthenticated, userController.postUser);
app.post("/user/teams", ensureAuthenticated, userController.postUserTeams);
app.get("/user", ensureAuthenticated, userController.getUser);
app.get("/users", ensureAuthenticated, userController.getAllUsers);
app.delete("/user", ensureAuthenticated, userController.deleteUser);
app.post("/user/role", ensureAuthenticated, userController.postRole);

import * as injuryController from "./controllers/injury";
app.post("/singleInjury", ensureAuthenticated, injuryController.postInjury);
app.get("/singleInjury", ensureAuthenticated, injuryController.getInjury);
app.post("/injuryNote", ensureAuthenticated, injuryController.postInjuryNote);
app.post("/injurySpecialNote", ensureAuthenticated, injuryController.postInjurySpecialNote);
app.get("/injuriesInDateRange", ensureAuthenticated, injuryController.getInjuriesByRange);
app.post("/injuryActive", ensureAuthenticated, injuryController.setActive);
app.put("/singleInjury", ensureAuthenticated, injuryController.updateInjury);

import * as athleteController from "./controllers/athlete";
app.post("/athlete", ensureAuthenticated, athleteController.postAthlete);
app.get("/athlete", ensureAuthenticated, athleteController.getAthlete);
app.put("/athlete", ensureAuthenticated, athleteController.putAthlete);
app.get("/allAthletes", ensureAuthenticated, athleteController.getAllAthletes);
app.post("/file", ensureAuthenticated, upload.single("fileUpload"), ensureAuthenticated, athleteController.postFile);
app.get("/file", ensureAuthenticated, athleteController.getFile);
app.delete("/file", ensureAuthenticated, athleteController.deleteFile);

// Routes
app.get("/*", ensureAuthenticated, (_req, res) => {
  res.sendFile(HTML_FILE); // EDIT
});

export default app;
