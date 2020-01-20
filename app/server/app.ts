import express from "express";
import path from "path";
import bodyParser from "body-parser";

//paths
const DIST_DIR = path.join(__dirname, "../dist"); // NEW
const HTML_FILE = path.join(DIST_DIR, "index.html"); // NEW

const app = express();

app.set("port", process.env.PORT || 3000);
app.use(express.static(DIST_DIR)); // NEW
app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.sendFile(HTML_FILE); // EDIT
});

// Controllers (route handlers)
import * as teamController from "./controllers/team";

app.post("/teams", teamController.postTeam);
app.get("/teams", teamController.getTeam);
app.put("/teams", teamController.modifyTeam);
app.delete("/teams", teamController.deleteTeam);
app.get("/allTeams", teamController.getAllTeams);


// import * as userController from "./controllers/user";

import * as injuryController from "./controllers/injury";
app.post("/singleInjury", injuryController.postInjury);
app.get("/injuriesInDateRange", injuryController.getInjuriesByRange);

// Routes

export default app;
