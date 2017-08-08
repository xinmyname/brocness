import Router from './infrastructure/router';
import StatusController from './controllers/status-controller';
import VariablesController from './controllers/variables-controller';

let router = new Router(document.getElementById("shell"));

router
    .add(/status/, new StatusController())
    .add(/vars/, new VariablesController())
    .start();

console.log("Initialized.");

