import {BaseController} from "../infrastructure/controller";

export default class StatusController extends BaseController {
    
    activate(): void {
        console.log("Status controller!");

        let h2 = document.createElement("h2");
        h2.innerText = "Status"

        this.shellElement.appendChild(h2);
    }
}
