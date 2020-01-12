
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
            this.listContainer.innerHTML = '';

            items.map(item => {
                this.insertItem(item);
            });
        }
    }

    insertItem(item) {
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
    }
}