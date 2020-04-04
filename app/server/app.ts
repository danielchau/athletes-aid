import express from "express";
import path from "path";
import bodyParser from "body-parser";
import * as multer from "multer";
import passport from "passport";
import * as saml from "passport-saml";
import * as fs from "fs";
import session from "express-session";
import * as userModel from "./models/user";
import { User, roles } from "./models/schema/User";

var storage = multer.memoryStorage();
var upload = multer.default({ storage: storage });

//paths
const DIST_DIR = path.join(__dirname, "../dist"); // NEW
const HTML_FILE = path.join(DIST_DIR, "index.html"); // NEW
const ATHLETE_CSV = path.join(DIST_DIR, "athleteBulkTemplate.csv");

/**
 *  SAML strategy for UBC CWL
 */
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

/**
 * Downloads the athlete template
 */
app.get("/athleteTemplate", ensureAuthenticated, function(_req, res) {
  res.download(ATHLETE_CSV);
});

/**
 * Ensures the user is authenticated
 */
function ensureAuthenticated(
  req: { isAuthenticated: () => any },
  res: { redirect: (arg0: string) => any },
  next: () => any
) {
  if (req.isAuthenticated()) return next();
  else return res.redirect("/login");
}

/**
 * Checks that the user is in an authorized role for the endpoint
 */
const checkIsInRole = (...roles: string[]) => (
  req: any,
  res: any,
  next: any
) => {
  const hasRole = roles.find(role => req.session.passport.user.role === role);
  if (!hasRole) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  return next();
};

/**
 *  Login redirect to UBC CWL
 */
app.get(
  "/login",
  passport.authenticate("saml", { failureRedirect: "/login/fail" }),
  function(_req, res) {
    res.redirect("/");
  }
);

/**
 *  Login callback from UBC CWL
 */
app.post(
  "/login/callback",
  passport.authenticate("saml", { failureRedirect: "/login/fail" }),
  function(_req, res) {
    res.redirect("/");
  }
);

/**
 *  Login fail callback from UBC CWL
 */
app.get("/login/fail", function(_req, res) {
  console.log("Login failed");
  res.status(401).send("Login failed");
});

/**
 *  Logout from UBC CWL
 */
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

/**
 *  Metadata xml endpoint for CWL metadata
 */
app.get("/metadata", function(_req, res) {
  //const decryptionCert = fs.readFileSync(__dirname + "/cert/cert.pem", "utf8");

  //const metadata = SamlStrategy.generateServiceProviderMetadata(decryptionCert);
  const metadata = fs.readFileSync(__dirname + "/metadata.xml", "utf8");

  res.type("application/xml");
  res.status(200).send(metadata);
});

// Controllers (route handlers)
import * as teamController from "./controllers/team";

app.post(
  "/team",
  ensureAuthenticated,
  checkIsInRole(roles.Admin),
  teamController.postTeam
);
app.get(
  "/team",
  ensureAuthenticated,
  checkIsInRole(roles.Admin, roles.Trainer),
  teamController.getTeam
);
app.put(
  "/team",
  ensureAuthenticated,
  checkIsInRole(roles.Admin, roles.Trainer),
  teamController.modifyTeam
);
app.delete(
  "/team",
  ensureAuthenticated,
  checkIsInRole(roles.Admin),
  teamController.deleteTeam
);
app.get(
  "/teams",
  ensureAuthenticated,
  checkIsInRole(roles.Admin, roles.Trainer, roles.Coach),
  teamController.getAllTeams
);

import * as userController from "./controllers/user";

app.post(
  "/user",
  ensureAuthenticated,
  checkIsInRole(roles.Admin),
  userController.postUser
);
app.post(
  "/user/teams",
  ensureAuthenticated,
  checkIsInRole(roles.Admin),
  userController.postUserTeams
);
app.get(
  "/user",
  ensureAuthenticated,
  checkIsInRole(roles.Admin, roles.Trainer, roles.Coach),
  userController.getUser
);
app.get(
  "/user/teams",
  ensureAuthenticated,
  checkIsInRole(roles.Admin, roles.Trainer, roles.Coach),
  userController.getUserTeams
);
app.get(
  "/users",
  ensureAuthenticated,
  checkIsInRole(roles.Admin),
  userController.getAllUsers
);
app.delete(
  "/user",
  ensureAuthenticated,
  checkIsInRole(roles.Admin),
  userController.deleteUser
);
app.post(
  "/user/role",
  ensureAuthenticated,
  checkIsInRole(roles.Admin),
  userController.postRole
);

import * as injuryController from "./controllers/injury";

app.post(
  "/singleInjury",
  ensureAuthenticated,
  checkIsInRole(roles.Admin, roles.Trainer),
  injuryController.postInjury
);
app.get(
  "/singleInjury",
  ensureAuthenticated,
  checkIsInRole(roles.Admin, roles.Trainer),
  injuryController.getInjury
);
app.post(
  "/injuryNote",
  ensureAuthenticated,
  checkIsInRole(roles.Admin, roles.Trainer),
  injuryController.postInjuryNote
);
app.post(
  "/injurySpecialNote",
  ensureAuthenticated,
  checkIsInRole(roles.Admin, roles.Trainer),
  injuryController.postInjurySpecialNote
);
app.get(
  "/injuriesInDateRange",
  ensureAuthenticated,
  checkIsInRole(roles.Admin, roles.Trainer),
  injuryController.getInjuriesByRange
);
app.post(
  "/injuryActive",
  ensureAuthenticated,
  checkIsInRole(roles.Admin, roles.Trainer),
  injuryController.setActive
);
app.put(
  "/singleInjury",
  ensureAuthenticated,
  checkIsInRole(roles.Admin, roles.Trainer),
  injuryController.updateInjury
);

import * as athleteController from "./controllers/athlete";
app.post(
  "/athlete",
  ensureAuthenticated,
  checkIsInRole(roles.Admin),
  athleteController.postAthlete
);
app.get(
  "/athlete",
  ensureAuthenticated,
  checkIsInRole(roles.Admin, roles.Trainer, roles.Coach),
  athleteController.getAthlete
);
app.put(
  "/athlete",
  ensureAuthenticated,
  checkIsInRole(roles.Admin),
  athleteController.putAthlete
);
app.get(
  "/allAthletes",
  ensureAuthenticated,
  checkIsInRole(roles.Admin),
  athleteController.getAllAthletes
);
app.post(
  "/file",
  ensureAuthenticated,
  checkIsInRole(roles.Admin, roles.Trainer),
  upload.single("fileUpload"),
  athleteController.postFile
);
app.get(
  "/file",
  ensureAuthenticated,
  checkIsInRole(roles.Admin, roles.Trainer),
  athleteController.getFile
);
app.delete(
  "/file",
  ensureAuthenticated,
  checkIsInRole(roles.Admin, roles.Trainer),
  athleteController.deleteFile
);

app.get("/*", ensureAuthenticated, (_req, res) => {
  res.sendFile(HTML_FILE);
});

export default app;
