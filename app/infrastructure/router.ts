import Route from "../models/route"
import {Controller} from "./controller";

export default class Router {

    private _shellElement: HTMLElement;
    private _mode: string = 'hash';
    private _routes: Route[] = [];
    private _root: string = '/';

    constructor(shellElement:HTMLElement, options?:any) {

        this._shellElement = shellElement;

        this._mode = options && options.mode && options.mode == 'history' && !!(history.pushState)
            ? 'history'
            : 'hash';
    }

    public getFragment(): string {

        let fragment = '';

        if (this._mode === 'history') {

            fragment = Router.clearSlashes(decodeURI(location.pathname + location.search));
            fragment = fragment.replace(/\?(.*)$/, '');
            fragment = this._root != '/' 
                ? fragment.replace(this._root, '') 
                : fragment;
        } else {
            let match = window.location.href.match(/#(.*)$/);
            fragment = match ? match[1] : '';
        }

        return Router.clearSlashes(fragment);
    }

    public add(matchExpr: RegExp, controller: Controller): Router {

        controller.shellElement = this._shellElement;

        this._routes.push(new Route(matchExpr, controller));

        return this;
    }

    public flush(): Router {

        this._routes = [];
        return this;
    }

    public start(): Router {

        let self = this;

        window.onpopstate = (event) => {
            console.log("** POP! **");
            self.check(self.getFragment());
        };

        return this;
    }

    public navigate(path: string): Router {

        path = path ? path : '';

        if (this._mode === 'history') {
            history.pushState(null, "", this._root + Router.clearSlashes(path));
        } else {
            window.location.href = window.location.href.replace(/#(.*)$/, '') + '#' + path;
        }

        return this;
    }

    private check(f?: string): Router {

        let fragment = f || this.getFragment();

        for (let i = 0; i < this._routes.length; i++) {

            let match = fragment.match(this._routes[i].matchExpr);

            if (match) {
                match.shift();
                let controller = this._routes[i].controller;
                controller.params = match;
                let range = document.createRange();
                range.selectNodeContents(this._shellElement);
                range.deleteContents();
                controller.activate();
                return this;
            }           
        }

        return this;
    }

    private static clearSlashes(path: string): string {
        return path.toString().replace(/\/$/, '').replace(/^\//, '');
    }
}
