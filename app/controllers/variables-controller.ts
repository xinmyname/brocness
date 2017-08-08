import {BaseController} from "../infrastructure/controller";

export default class VariablesController extends BaseController {
    
    activate(): void {
        console.log("Variables controller!");

        let h2 = document.createElement("h2");
        h2.innerText = "Variables"

        this.shellElement.appendChild(h2);
    }
}
