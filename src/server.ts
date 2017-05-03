import * as bodyParser from "body-parser";
import * as cookieParser from "cookie-parser";
import * as express from "express";
import * as logger from "morgan";
import * as path from "path";
import errorHandler = require("errorhandler");
import methodOverride = require("method-override");

import { IndexRoute } from "./routes/index"

export class Server {
    public app: express.Application;

    public static bootstrap(): Server {
        return new Server();
    }
    /**
     *
     */
    constructor() {
        //create expressjs applciation
        this.app = express();
        //configure application
        this.config();
        //add routes
        this.routes();
        //add api
        this.api();
    }
    /**
     * Creates REST API routes
     * 
     * 
     * @memberof Server
     */
    public api() {

    }
    /**
     * Configure application
     * 
     * 
     * @memberof Server
     */
    public config() {
        //add static paths
        this.app.use(express.static(path.join(__dirname, "public")));

        //configure pug
        this.app.set("views", path.join(__dirname, "views"));
        this.app.set("view engine", "pug");

        //use logger middleware
        this.app.use(logger("dev"));

        //use json form parser middleware
        this.app.use(bodyParser.json());

        //use query string parser middleware
        this.app.use(bodyParser.urlencoded({ extended: true }));

        //use cookie parker middleware 
        this.app.use(cookieParser("SECRET_GOES_HERE"));

        //use override middleware
        this.app.use(methodOverride());

        //catch 404 and forward to error handler
        this.app.use(function (err: any, req: express.Request,
            res: express.Response, next: express.NextFunction) {
            err.status = 404;
            next(err);
        });

        //error handling
        this.app.use(errorHandler());
    }
    /**
     * Create router
     * 
     * 
     * @memberof Server
     */
    public routes() {
        let router: express.Router;
        router = express.Router();
        IndexRoute.create(router);
        this.app.use(router);
    }
}