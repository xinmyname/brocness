export interface Controller {
    
    params: any;    
    activate(): HTMLElement;
}

export abstract class BaseController implements Controller {

    params: any;
    abstract activate(): HTMLElement;
}
