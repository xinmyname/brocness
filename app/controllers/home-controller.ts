import {BaseController} from "../infrastructure/controller";

export default class HomeController extends BaseController {
    
    private _varsElement : HTMLInputElement;

    activate(): HTMLElement {
        console.log("Home controller!");

        let content = document.createElement("div");

        content.appendChild(this.createPlantDropDown());
        content.appendChild(this.createVarsTextBox());
        content.appendChild(this.createQueryButton());

        return content;
    }

    private createPlantDropDown(): HTMLElement {

        let div = document.createElement("div");

        div.innerHTML = "\
            <select>\
                <option>Durham</option>\
                <option>Rock Creek</option>\
                <option>Forest Grove</option>\
                <option>Hillsboro</option>\
            </select>";

        return div;
    }

    private createVarsTextBox(): HTMLElement {

        let div = document.createElement("div");

        this._varsElement = document.createElement("input") as HTMLInputElement;

        div.appendChild(this._varsElement);

        return div;
    }

    private createQueryButton(): HTMLElement {

        let div = document.createElement("div");
        let button = document.createElement("button");

        button.innerText = "Query"
        button.onclick = this.clicked;

        div.appendChild(button);

        return div;
    }

    private clicked = (ev: MouseEvent) => {
        console.log(this._varsElement.value);
    }
}
