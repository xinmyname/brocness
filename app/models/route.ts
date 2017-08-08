export default class Route {

    public re: RegExp;
    public handler: (...args: any[]) => void

    constructor(re: RegExp, handler: (...args: any[]) => void) {

        this.re = re;
        this.handler = handler;
    }
}
