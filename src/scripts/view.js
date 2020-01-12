
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
    }

    /**
     * add elements to list
     */
    render(items) {
        this.listContainer.innerHTML = '';

        if (items.length > 0) {
            this.mainSection.style.display = 'block';
            this.footerSection.style.display = 'block';

            items.map(item => {
                this.insertItem(item);
            });
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
        this.listContainer.appendChild(itemContainer);

        if (itemsLength === 0) {
            this.mainSection.style.display = 'block';
            this.footerSection.style.display = 'block';
        }
    }

    /**
     * Count not complete items left.
     *
     * @param {Array} items
     */
    counter(items) {
        let activeItems = 0;
        activeItems = items.length;

        if (activeItems === 1) {
            this.itemsCounter.innerHTML = `<strong>${activeItems}</strong> item left`;
        } else {
            this.itemsCounter.innerHTML = `<strong>${activeItems}</strong> items left`;
        }
    }
}