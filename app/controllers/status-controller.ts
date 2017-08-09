import {BaseController} from "../infrastructure/controller";

export default class StatusController extends BaseController {
    
    activate(): HTMLElement {
        console.log("Status controller!");

        let content = document.createElement("div");

        let h2 = document.createElement("h2");
        h2.innerText = "Status"

        content.appendChild(h2);

        return content;
    }
}

