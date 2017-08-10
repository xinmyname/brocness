import Router from './infrastructure/router';
import HomeController from './controllers/home-controller';
import StatusController from './controllers/status-controller';
import VariablesController from './controllers/variables-controller';

let router = new Router(document.getElementById("shell"));

router
    .add(null, new HomeController())
    .add(/status/, new StatusController())
    .add(/vars\/(.*)/, new VariablesController())
    .start();
