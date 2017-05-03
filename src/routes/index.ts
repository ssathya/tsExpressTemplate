import { NextFunction, Request, Response, Router } from "express";
import { BaseRoute } from './route';

export class IndexRoute extends BaseRoute {
    public static create(router: Router) {
        console.log("[IndexRouter::create] creating index route.");

        //add home page route
        router.get("/", (req: Request, res: Response, next: NextFunction) => {
            new IndexRoute().index(req, res, next);
        });
    }
    /**
     *
     */
    constructor() {
        super();
    }
    /**
     * The home page route
     * 
     * @param {Request} req 
     * @param {Response} res 
     * @param {NextFunction} next 
     * 
     * @memberof IndexRoute
     */
    public index(req: Request, res: Response, next: NextFunction) {
        this.title = "Home | Tour of Heros";

        let options: Object = {
            "message": "Welcome to the Tour of Heros"
        };

        //render template
        this.render(req, res, "index", options);
    }
}