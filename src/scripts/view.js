/**
 * @constant
 * @type {Object}
 */
const KEYBOARD_KEYS = {
    ENTER: 13,
    ESC: 27
};

export default class View {

    constructor() {
        this.listContainer = document.querySelector('.todo-list');
        this.mainSection = document.querySelector('.main');
        this.footerSection = document.querySelector('.footer');
        this.itemsCounter = document.querySelector('.todo-count');
        this.toggleAllCheck = document.querySelector('.toggle-all');
    }

    /**
     * add elements to list
     */
    render(items, data) {
        this.listContainer.innerHTML = '';
        let completedItems = 0;

        if (items.length > 0) {
            this.mainSection.style.display = 'block';
            this.footerSection.style.display = 'block';

            items.filter(item => {
                return !((data.view === 'active' && item.completed) || (data.view === 'completed' && !item.completed));
            }).map(item => {
                this.insertItem(item);
                if (item.completed) {
                    completedItems++;
                }
            });

            this.toggleAllCheck.checked = completedItems === items.length;
        } else {
            this.mainSection.style.display = 'none';
            this.footerSection.style.display = 'none';
        }
    }

    insertItem(item) {
        let itemsLength = this.listContainer.children.length;
        let itemContent = `
            <div class="view">
                <input class="toggle" type="checkbox">
                <label>${item.title}</label>
                <button class="destroy"></button>
            </div>
            <input class="edit" value="${item.title}">
        `;
        let itemContainer = document.createElement('li');
        itemContainer.innerHTML = itemContent;
        itemContainer.setAttribute('data-id', item.id);

        if (itemsLength === 0) {
            this.mainSection.style.display = 'block';
            this.footerSection.style.display = 'block';
        }

        if (item.completed) {
            let toggle = itemContainer.querySelector('.toggle');
            toggle.setAttribute('checked', 'true');
            itemContainer.className = 'completed';
        }

        this.listContainer.appendChild(itemContainer);
    }

    /**
     * Count not complete items left.
     *
     * @param {Array} items
     */
    counter(items) {
        let activeItems = 0;

        for (let item of items) {
            if (!item.completed) {
                activeItems++;
            }
        }

        if (activeItems === 1) {
            this.itemsCounter.innerHTML = `<strong>${activeItems}</strong> item left`;
        } else {
            this.itemsCounter.innerHTML = `<strong>${activeItems}</strong> items left`;
        }
    }

    /**
     * Handle toggle complete toto from list.
     *
     * @param {Event} e
     * @param {Function} callback
     * @public
     */
    toggle(e, callback) {
        let target = e.target;

        if (target.className === 'toggle') {
            let itemContainer = target.parentNode;

            while (itemContainer.tagName !== 'LI') {
                itemContainer = itemContainer.parentNode;
            }

            itemContainer.classList.toggle('completed');

            let id = itemContainer.getAttribute('data-id');
            if (target.getAttribute('checked')) {
                target.removeAttribute('checked');
                callback(id, false);
            } else {
                target.setAttribute('checked', 'true');
                callback(id, true);
            }
        }
    }

    /**
     * Handle toggleAll complete toto from list.
     *
     * @param {Event} e
     * @param {Function} callback
     * @public
     */
    toggleAll(e, callback) {
        let checkedAll = e.target;
        callback(checkedAll.checked);
    }

    /**
     * Handle toggleAll complete toto from list.
     *
     * @param {Event} e
     * @public
     */
    filter(e) {
        let target = e.target;
        if (target.tagName === 'A') {
            let filterContainer = target.parentNode;

            while (filterContainer.tagName !== 'UL') {
                filterContainer = filterContainer.parentNode;
            }

            let currentFilter = filterContainer.querySelector('a.selected');
            currentFilter.classList.toggle('selected');
            target.className = 'selected';
        }
    }

    /**
     * Handle edit toto from list.
     *
     * @param {Event} e
     * @param {Function} callback
     * @public
     */
    edit(e, callback) {
        let target = e.target;
        if (target.tagName === 'LABEL') {
            let itemContainer = target.parentNode;

            while (itemContainer.tagName !== 'LI') {
                itemContainer = itemContainer.parentNode;
            }

            let id = itemContainer.getAttribute('data-id');
            callback(id);
        }
    }

    /**
     * Transform todo to an editable field.
     *
     * @param {Number} id
     * @public
     */
    editableTodo(id) {
        let itemContainer = document.querySelector(`li[data-id="${id}"]`);
        let itemEditContainer = itemContainer.querySelector('.edit');
        itemContainer.classList.add('editing');
        itemEditContainer.focus();

        // Set caret position to the end of the input field.
        let length = itemEditContainer.value.length;
        itemEditContainer.setSelectionRange(length, length);
    }

    /**
     * Handle update toto.
     *
     * @param {Number} id
     * @param {Function} callback
     * @public
     */
    save(id, callback) {
        let itemContainer = document.querySelector(`li[data-id="${id}"]`);
        let itemEditContainer = itemContainer.querySelector('.edit');
        let originalValue = itemEditContainer.value;

        let _handleEditCallback = (event) => {
            let inputValue = itemEditContainer.value.trim();

            if (event.keyCode === KEYBOARD_KEYS.ENTER || event.type === 'blur') {
                if (inputValue !== '') {
                    callback(id, 'save', inputValue);
                    itemContainer.classList.remove('editing');
                } else {
                    callback(id, 'remove', inputValue);
                }
            } else if (event.keyCode === KEYBOARD_KEYS.ESC) {
                itemContainer.classList.remove('editing');
                itemEditContainer.value = originalValue;
            }
        };

        itemEditContainer.addEventListener('keydown', _handleEditCallback);
        itemEditContainer.addEventListener('blur', _handleEditCallback);
    }
}

