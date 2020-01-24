import express from "express";
import path from "path";
import bodyParser from "body-parser";

//paths
const DIST_DIR = path.join(__dirname, "../dist"); // NEW
const HTML_FILE = path.join(DIST_DIR, "index.html"); // NEW
const ATHLETE_CSV = path.join(DIST_DIR, "athleteBulkTemplate.csv");

const app = express();

app.set("port", process.env.PORT || 3000);
app.use(express.static(DIST_DIR)); // NEW
app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.sendFile(HTML_FILE); // EDIT
});

app.get("/athleteTemplate", function(req, res) {
  res.download(ATHLETE_CSV);
});

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
app.get("/injuriesInDateRange", injuryController.getInjuriesByRange);

import * as athleteController from "./controllers/athlete";
app.post("/athlete", athleteController.postAthlete);
app.get("/allAthletes", athleteController.getAllAthletes);
app.get("/athlete", athleteController.getAthlete);

// Routes

export default app;
