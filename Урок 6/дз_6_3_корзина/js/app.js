let toBasketButton = document.querySelectorAll('.toBasketBtn')
/**
 * иниализируем слушатель клика по кнопке купить
 */
toBasketButton.forEach(function (btn) {
    btn.addEventListener('click', function (event) {
        let id = event.toElement.dataset.id;
        let price = event.toElement.dataset.price;
        let name = event.toElement.dataset.name;
        basket.addProduct(id, price, name)
    })
});


let basket = {
    products: {},

    addProduct(id, price, name) {
        this.addProductToObject(id, price, name);
        this.renderProductInBasket(id, price, name);
        basket.renderTotalSum();
        this.removesProductBasket();
    },

    /**
     * Метод отрисовывает продукт в корзине, если там такой уже есть просто
     * увеличивает счетчик на 1.
     * @param {{ id: string, price: string, name: string }} product
     * @returns
     */
    renderProductInBasket(id, price, name) {
        let productExist = document.querySelector(`.productCount[data-id="${id}"]`);
        if (productExist) {
            productExist.textContent++;
            return;
        }
        let productRow = `
            <tr>
                <th scope="row">${id}</th>
                <td>${name}</td>
                <td>${price}</td>
                <td class="productCount" data-id="${id}">1</td>
                <td><i class="fas fa-trash-alt productRemoveBtn" data-id="${id}"></i></td>
            </tr>
        `;
        let tbody = document.querySelector('tbody');
        tbody.insertAdjacentHTML("beforeend", productRow);
    },
    /**
     * удаляет суму при удалении товара с корзины
     * @param {*} event 
     */
    deleteProduct(event) {
        basket.removeProduct(event);
        basket.renderTotalSum();
    },

    /**
     * иниализируем слушатель клика по кнопке удалить
     */
    removesProductBasket() {
        let removesBt = document.querySelectorAll('.productRemoveBtn')
        for (let i = 0; i < removesBt.length; i++) {
            removesBt[i].addEventListener('click', this.deleteProduct);
        }
    },

    removeProduct(event) {
        let id = event.srcElement.dataset.id;
        this.removeProductFromObject(id);
        this.removeProductFromBasket(id);
    },

    /**
     * Метод удаляет продукт из объекта с продуктами.
     * @param {string} id
     */
    removeProductFromObject(id) {
        if (this.products[id].count == 1) {
            delete this.products[id];
        } else {
            this.products[id].count--;
        }
    },

    /**
     * Метод удаляет товар из корзины. Если количество больше 1, то просто уменьшает его.
     * @param {string} id
     */
    removeProductFromBasket(id) {
        let countTd = document.querySelector(`.productCount[data-id="${id}"]`);
        if (countTd.textContent == 1) {
            countTd.parentNode.remove();
        } else {
            countTd.textContent--;
        }
    },
    /**
     * Метод добавляет продукт в объект с продуктами.
     * @param {{ id: string, price: string, name: string }} product
     */
    addProductToObject(id, price, name) {
        if (this.products[id] == undefined) {
            this.products[id] = {
                price: price,
                name: name,
                count: 1
            }
        } else {
            this.products[id].count++;
        }
    },

    /**
     * Метод считает стоимость всех продуктов в корзине.
     * @returns {number}
     */
    getTotalSum() {
        let sum = 0;
        for (let key in this.products) {
            sum += this.products[key].price * this.products[key].count;
        }
        return sum;
    },

    /**
     * Метод отображает общую сумму заказа в корзине.
     */
    renderTotalSum() {
        document.querySelector('.total').textContent = this.getTotalSum();
    },

    /**
     * Метод считает стоимость всех продуктов в корзине.
     * @returns {number}
     */
    getTotalSum() {
        let sum = 0;
        for (let key in this.products) {
            sum += this.products[key].price * this.products[key].count;
        }
        return sum;
    },
}