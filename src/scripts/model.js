export default class Model {
    constructor() {
        this.storageId = 'todos-es6';
        this.storage = window.localStorage;
    }

    /**
     * Find all stored todos.
     *
     * @return {Promise} promise
     * @public
     */
    fetchAll() {
        return new Promise((resolve, reject) => {
            let items = this.storage.getItem(this.storageId);

            if (items) {
                return resolve(JSON.parse(items));
            } else {
                return reject('Not found todos');
            }
        });
    }

    /**
     * Create a todo in the storage.
     *
     * @param {string} title
     * @return
     */
    create(title) {
        return this.fetchAll().then(items => {
            return new Promise((resolve, reject) => {
                let newItem = {
                    'id': (items)? items.length : 0, // Math.random(),
                    'title': title
                };
                items.push(newItem);
                this._updateLocalStorage(items);
                resolve(newItem);
            });
        });
    }

    /**
     * Update the local storage.
     *
     * @private
     */
    _updateLocalStorage(data) {
        this.storage.setItem(this.storageId, JSON.stringify(data));
    }
}