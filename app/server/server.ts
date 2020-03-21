import app from "./app";
import https from "https";
import errorHandler from "errorhandler";

/**
 * Error Handler. Provides full stack - remove for production
 */
app.use(errorHandler());

const server = https.createServer(app).listen(app.get("port"), () => {
  console.log(
    "  App is running at http://localhost:%d in %s mode",
    app.get("port"),
    app.get("env")
  );
  console.log("  Press CTRL-C to stop\n");
});

export default server;
