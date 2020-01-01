import View from './view';

/**
 * Control the behaviour and flow of the app.
 * @author oussaka
 * @class
 * @exports Controller
 */
export default class Controller {
    constructor() {
        this.view = new View();
        this.items = [
            'hello world!',
            'happy new year 2020',
            'ES6 tutorial TODO'
        ];
        this._initListeners();
    }

    /**
     * Initialize the app to load the initial view and listen to hash changes.
     * @author oussaka
     * @public
     */
    init() {
        this._setView(this.items);
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
            this.view.insertItem(e.currentTarget.value);
            e.currentTarget.value = '';
        }
    }

    /**
     * Initialize the listeners and its appropriate handlers.
     *
     * @author Aleksandar Jovanov <ace92bt@gmail.com>
     * @private
     */
    _initListeners() {
        let input = document.querySelector('.new-todo');
        input.addEventListener('keydown', (event) => this._insertItem(event));
    }
}
