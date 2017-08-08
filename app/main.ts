import Router from './infrastructure/router'

let router = new Router();

router
    .add(/status/, () => {
        console.log("Status!");
    })
    .add(/vars/, () => {
        console.log("Variables!");
    })
    .check()
    .listen();

console.log("Initialized.");

