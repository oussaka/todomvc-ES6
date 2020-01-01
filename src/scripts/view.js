
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
    }

    /**
     * add elements to list
     */
    render(items) {
        if (items.length > 0) {
            this.mainSection.style.display = 'block';
            this.footerSection.style.display = 'block';

            items.map(item => {
                this.insertItem(item);
            });
        }
    }

    insertItem(item) {
        let itemContent = `
            <div class="view">
                <input class="toggle" type="checkbox">
                <label>${item}</label>
                <button class="destroy"></button>
            </div>
            <input class="edit" value="${item}">
        `;
        let itemContainer = document.createElement('li');
        itemContainer.innerHTML = itemContent;
        this.listContainer.appendChild(itemContainer);
    }
}