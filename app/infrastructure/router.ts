import Route from "../models/route"

export default class Router {

    private _routes: Route[];
    private _root: string = '/';

    public getFragment(): string {

        let fragment = '';

        fragment = Router.clearSlashes(decodeURI(location.pathname + location.search));
        fragment = fragment.replace(/\?(.*)$/, '');
        fragment = this._root != '/' 
            ? fragment.replace(this._root, '') 
            : fragment;

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

    public check(f: string): Router {

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

        history.pushState(null, null, this._root + Router.clearSlashes(path));

        return this;
    }

    private static clearSlashes(path: string): string {
        return path.toString().replace(/\/$/, '').replace(/^\//, '');
    }
}
