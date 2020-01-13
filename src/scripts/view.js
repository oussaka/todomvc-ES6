
export default class View {

    /**
     * @constant
     * @type {Object}
     */
    static KEYBOARD_KEYS = {
        ENTER: 13,
        ESC: 27
    };

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
    render(items) {
        this.listContainer.innerHTML = '';
        let completedItems = 0;

        if (items.length > 0) {
            this.mainSection.style.display = 'block';
            this.footerSection.style.display = 'block';

            items.map(item => {
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

        if (item.completed) {
            let toggle = itemContainer.querySelector('.toggle');
            toggle.setAttribute('checked', true);
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
}