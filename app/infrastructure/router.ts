import Route from "../models/route"

export default class Router {

    private _mode: string = 'hash';
    private _routes: Route[] = [];
    private _root: string = '/';

    constructor(options?:any) {
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

    public add(re: any, handler: any): Router {

        if (typeof re == 'function') {
            handler = re;
            re = '';
        }

        this._routes.push(new Route(re, handler));

        return this;
    }

    public remove(param: any): Router {

        for (let i = 0, r; i < this._routes.length, r = this._routes[i]; i++) {

            if(r.handler === param || r.re.toString() === param.toString()) {
                this._routes.splice(i, 1); 
                return this;
            }
        }
        return this;
    }

    public flush(): Router {

        this._routes = [];
        return this;
    }

    public check(f?: string): Router {

        let fragment = f || this.getFragment();

        for (let i = 0; i < this._routes.length; i++) {

            let match = fragment.match(this._routes[i].re);

            if (match) {
                match.shift();
                this._routes[i].handler.apply({}, match);
                return this;
            }           
        }

        return this;
    }

    public listen(): Router {

        let self = this;

        window.onpopstate = (event) => {
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

    private static clearSlashes(path: string): string {
        return path.toString().replace(/\/$/, '').replace(/^\//, '');
    }
}
