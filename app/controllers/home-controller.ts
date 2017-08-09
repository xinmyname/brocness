import {BaseController} from "../infrastructure/controller";

export default class HomeController extends BaseController {
    
    activate(): HTMLElement {
        console.log("Home controller!");

        return document.createElement("div");
    }
}

