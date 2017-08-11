import {BaseController} from "../infrastructure/controller";

export default class HomeController extends BaseController {
    
    private _varListEl : HTMLInputElement;

    activate(): HTMLElement {

        let form = document.createElement("form");

        form.appendChild(this.createPlantDropDown());
        form.appendChild(this.createVarsTextBox());
        form.appendChild(this.createSubmitButton());

        return form;
    }

    private createPlantDropDown(): HTMLElement {

        let id = "plant";

        let formGroup = document.createElement("div");
        formGroup.classList.add("form-group");

        let label = document.createElement("label") as HTMLLabelElement;
        label.textContent = "Plant"
        label.htmlFor = id;
        formGroup.appendChild(label);

        let select = document.createElement("select") as HTMLSelectElement;
        select.id = id;
        select.classList.add("form-control");
        formGroup.appendChild(select);

        select.innerHTML = "\
            <option>Durham</option>\
            <option>Rock Creek</option>\
            <option>Forest Grove</option>\
            <option>Hillsboro</option>"        

        return formGroup;
    }

    private createVarsTextBox(): HTMLElement {

        let id = "varList";

        let formGroup = document.createElement("div");
        formGroup.classList.add("form-group");

        let label = document.createElement("label") as HTMLLabelElement;
        label.textContent = "Variable List"
        label.htmlFor = id;
        formGroup.appendChild(label);

        let input = document.createElement("input") as HTMLInputElement;
        input.id = id;
        input.classList.add("form-control");
        input.type = "text"
        input.placeholder = "4,8,15,16,23,42"
        formGroup.appendChild(input);

        this._varListEl = input;

        return formGroup;
    }

    private createSubmitButton(): HTMLElement {

        let button = document.createElement("button") as HTMLButtonElement;
        button.type = "button";
        button.classList.add("btn");
        button.classList.add("btn-default");
        button.innerText = "Submit"
        button.onclick = this.submitClicked;

        return button;
    }

    private submitClicked = (ev: MouseEvent) => {
        console.log(this._varListEl.value);    
        return true;    
    }
}
