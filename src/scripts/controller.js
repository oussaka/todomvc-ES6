import View from './view';
import Model from './model';

/**
 * Control the behaviour and flow of the app.
 *
 * @author oussaka
 * @class
 * @exports Controller
 */
export default class Controller {
    constructor() {
        this.view = new View();
        this.model = new Model();
        this._initListeners();
    }

    /**
     * Initialize the app to load the initial view and listen to hash changes.
     *
     * @public
     */
    init() {
        this.model.fetchAll()
        .then(todos => {
            this._setView(todos);
        }).catch(error => {
            console.error(error);
        });
    }

    _setView(items) {
        this.view.render(items);
    }

    /**
     * Handle add new toto to list.
     *
     * @param {Event} e
     * @private
     */
    _insertItem(e) {
        if (e.keyCode === View.KEYBOARD_KEYS.ENTER && e.currentTarget.value !== '') {
            this.model.create(e.currentTarget.value)
                .then(item => {
                    this.view.insertItem(item);
                })
            ;
            e.currentTarget.value = '';
        }
    }

    /**
     * Handle remove toto from list.
     *
     * @param {Event} e
     * @private
     */
    _removeItem(e) {
        let target = e.target;

        if (target.className === 'destroy') {
            let itemContainer = target.parentNode;

            while (itemContainer.tagName !== 'LI') {
                itemContainer = itemContainer.parentNode;
            }

            let id = itemContainer.getAttribute('data-id');
            this.model.remove(id)
                .then(() => this.init())
            ;
        }

        return undefined;
    }

    /**
     * Initialize the listeners and its appropriate handlers.
     *
     * @private
     */
    _initListeners() {
        let input = document.querySelector('.new-todo');
        input.addEventListener('keydown', (event) => this._insertItem(event));

        let destroy = document.querySelector('.todo-list');
        destroy.addEventListener('click', (event) => this._removeItem(event));
    }
}
