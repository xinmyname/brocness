export interface Controller {
    
    shellElement: HTMLElement;
    params: any;
    
    activate(): void;
}

export abstract class BaseController implements Controller {

    shellElement: HTMLElement;
    params: any;

    abstract activate(): void;
}
