import View from './view';

/**
 * @constant
 * @type {String}
 */
const ALLOWED_VIEWS = 'all|active|completed';

/**
 * Control the behaviour and flow of the app.
 *
 * @author oussaka
 * @class
 * @exports Controller
 */
export default class Controller {
    constructor(model, view) {
        this.view = view;
        this.model = model;
        this._initListeners();
    }

    /**
     * Initialize the app to load the initial view and listen to hash changes.
     *
     * @public
     */
    init() {
        let currentView = 'all';
        if (window.location.hash) {
            currentView = window.location.hash.substr(2);
        }

        this.model.fetchAll()
        .then(todos => {
            this._setView(todos, currentView);
        }).catch(error => {
            console.error(error);
        });
    }

    _setView(items, view = 'all') {
        if (view && ALLOWED_VIEWS.includes(view)) {
            this.view.render(items, {view});
            this.view.counter(items);
        } else {
            window.location.hash = '#/';
            this._setView(items, 'all');
        }
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
                .then(data => {
                    this.view.insertItem(data.newItem);
                    this.view.counter(data.items);
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
    }

    /**
     * Initialize the listeners and its appropriate handlers.
     *
     * @private
     */
    _initListeners() {
        let input = document.querySelector('.new-todo');
        input.addEventListener('keydown', (event) => this._insertItem(event));

        let todolist = document.querySelector('.todo-list');
        todolist.addEventListener('click', (event) => this._removeItem(event));
        todolist.addEventListener('dblclick', (event) => {
            this.view.edit(event, (id) => {
                this.view.editableTodo(id);
                this.view.save(id, (id, action, data) => {
                    if (action === 'save') {
                        this.model.update(id, {key: 'title', value: data})
                            .then(() => this.init())
                            .catch(error => console.error(error))
                        ;
                    } else if (action === 'remove') {
                        this.model.remove(id)
                            .then(() => this.init())
                        ;
                    }
                });
            });
        });

        todolist.addEventListener('click', (event) => {
            this.view.toggle(event, (id, completed) => {
                this.model.update(id, {key: 'completed', value: completed})
                    .then(() => this.init())
                    .catch(error => console.error(error))
                ;
            });
        });

        let toggleAll = document.querySelector('.toggle-all');
        toggleAll.addEventListener('click', (event) => {
            this.view.toggleAll(event, (completed) => {
                this.model.update(null, {key: 'completed', value: completed})
                    .then(() => this.init())
                    .catch(error => console.error(error))
                ;
            });
        });

        let filterSelected = document.querySelector('.filters');
        filterSelected.addEventListener('click', (event) => this.view.filter(event));

        window.addEventListener('hashchange', () => this.init());
    }
}
