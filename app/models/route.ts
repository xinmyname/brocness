import {Controller} from "../infrastructure/controller";

export default class Route {

    public matchExpr: RegExp | null;
    public controller: Controller;

    constructor(matchExpr: RegExp | null, controller: Controller) {

        this.matchExpr = matchExpr;
        this.controller = controller;
    }
}
