import { NextFunction, Request, Response } from "express";

export class BaseRoute {
    protected title: string;
    private scripts: string[];

    /**
     *
     */
    constructor() {
        this.title = "Tour of Heros";
        this.scripts = [];
    }
    /**
     * Add a JS external file to the request
     * 
     * @param {string} src 
     * @returns {BaseRoute} 
     * 
     * @memberof BaseRoute
     */
    public addScript(src: string): BaseRoute {
        this.scripts.push(src);
        return this;
    }
    /**
     * Render a page
     * 
     * @param {Request} req 
     * @param {Response} res 
     * @param {string} view 
     * @param {Object} [options] 
     * 
     * @memberof BaseRoute
     * @retrun void
     */
    public render(req: Request, res: Response, view: string, options?: Object) {
        //ADD CONSTANTS
        res.locals.BASE_URL = "/";
        //ADD scripts
        res.locals.scripts = this.scripts;
        //add title
        res.locals.title = this.title;
        //render view
        res.render(view, options);
    }
}