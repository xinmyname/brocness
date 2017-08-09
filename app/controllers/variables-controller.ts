import {BaseController} from "../infrastructure/controller";

export default class VariablesController extends BaseController {
    
    activate(): HTMLElement {
        console.log("Variables controller!");

        let content = document.createElement("div");

        let h2 = document.createElement("h2");
        h2.innerText = "Variables"

        content.appendChild(h2);

        return content;
    }
}
