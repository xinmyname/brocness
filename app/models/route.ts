import {Controller} from "../infrastructure/controller";

export default class Route {

    public matchExpr: RegExp;
    public controller: Controller;

    constructor(matchExpr: RegExp, controller: Controller) {

        this.matchExpr = matchExpr;
        this.controller = controller;
    }
}
