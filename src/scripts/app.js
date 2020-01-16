import Controller from './controller';
import View from './view';
import Model from './model';

const model = new Model('todos-es6');
const view = new View();

/**
 * @type {Controller}
 */
let todos = new Controller(model, view);
todos.init();
