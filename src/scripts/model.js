export default class Model {

    /**
     * @param {!string} name Database name
     */
    constructor(name) {
        this.storageId = name;
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
                let id = new Date().getTime().toString();
                let newItem = {id, title};
                items.push(newItem);
                this._updateLocalStorage(items);
                resolve({items, newItem});
            });
        });
    }

    /**
     * Remove a todo from the storage.
     *
     * @param {Number} id
     * @return {Promise} promise
     * @public
     */
    remove(id) {
        return new Promise((resolve, reject) => {
            if (id) {
                this.fetchAll().then(items => {
                    let todo = items.filter((item, i) => {
                        if (item.id === id) {
                            items.splice(i, 1);
                            return true;
                        }
                    });

                    if (todo.length === 1) {
                        this._updateLocalStorage(items);
                        resolve();
                    } else {
                        reject('Todo not found.');
                    }
                });
            }
        });
    }

    /**
     * Update a todo property.
     *
     * @param {Number} id
     * @param {Object} data
     * @return {Promise} promise
     * @public
     */
    update(id, data) {
        return new Promise((resolve, reject) => {
                this.fetchAll().then(items => {
                    if (id) {
                        let todo = items.filter((item, i) => {
                            if (item.id === id) {
                                item[data.key] = data.value;
                                return item;
                            }
                        });

                        if (todo.length === 1) {
                            this._updateLocalStorage(items);
                            resolve(todo);
                        } else {
                            reject('Todo not found.');
                        }
                    } else {
                        items.map((item) => {
                            item[data.key] = data.value;
                        });

                        this._updateLocalStorage(items);
                        resolve();
                    }
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