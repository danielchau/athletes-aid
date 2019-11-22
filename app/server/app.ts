import express from "express";
import path from "path";;


//paths
const DIST_DIR = path.join(__dirname, "../dist"); // NEW
const HTML_FILE = path.join(DIST_DIR, "index.html"); // NEW

const app = express();

app.set("port", process.env.PORT || 3000);
app.use(express.static(DIST_DIR)); // NEW


// Controllers (route handlers)
// import * as teamController from "./controllers/team";
// import * as userController from "./controllers/user";
// import * as injuryController from "./controllers/injury";

// Routes


export default app;