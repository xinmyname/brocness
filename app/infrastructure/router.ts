import Route from "../models/route"
import {Controller} from "./controller";

export default class Router {

    private _shellElement: HTMLElement;
    private _mode: string = 'hash';
    private _routes: Route[] = [];
    private _root: string = '/';

    constructor(shellElement:HTMLElement|null, options?:any) {

        this._shellElement = shellElement || document.documentElement;

        this._mode = options && options.mode && options.mode == 'history' && !!(history.pushState)
            ? 'history'
            : 'hash';
    }

    public add(matchExpr: RegExp | null, controller: Controller): Router {

        this._routes.push(new Route(matchExpr, controller));

        return this;
    }

    public start() {

        this.check();

        window.onpopstate = (event) => {
            this.check(this.getFragment());
        };
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

    private getFragment(): string {

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

    private check(f?: string) {

        let fragment = f || this.getFragment();
        let range = document.createRange();
        range.selectNodeContents(this._shellElement);
        range.deleteContents();

        for (let route of this._routes) {
            if (!route.matchExpr) {
                if (!fragment)
                    this._shellElement.appendChild(route.controller.activate());
            } else {
                let match = fragment.match(route.matchExpr);
                if (match) {
                    match.shift();
                    route.controller.params = match;
                    this._shellElement.appendChild(route.controller.activate());
                }
            }
        }
    }

    private static clearSlashes(path: string): string {
        return path.toString().replace(/\/$/, '').replace(/^\//, '');
    }
}

// Based on: http://krasimirtsonev.com/blog/article/A-modern-JavaScript-router-in-100-lines-history-api-pushState-hash-url