import * as express from 'express';
import "reflect-metadata";
import {createConnection} from "typeorm";
import * as appConfig from "./common/app-config";
import routes from "./routes";


/**
 * Create Express server.
 */
const app = express();

app.use(express.static('public'));

/**
 * Express configuration.
 */
app.set("port", process.env.PORT || 3000);

/**
 * Start Express server.
 */

app.listen(app.get("port"), () => {
  console.log(("  App is running at http://localhost:%d in %s mode"), app.get("port"), app.get("env"));
  console.log("  Press CTRL-C to stop\n");
});

//Set all routes from routes folder
app.use("/", routes);

/**
 * Create connection to DB using configuration provided in 
 * appconfig file.
 */

createConnection(appConfig.dbOptions).then(async connection => {
    console.log("Connected to DB");

}).catch(error => console.log("TypeORM connection error: ", error));

module.exports = app;