
// так как это шахматы игравое поле не может меняться, по этому и конфиг перенес
let config = {
    rowsCount: 10,
    colsCount: 10,
};

let renderer = {
    /**
     * Метод рисует игровое поле и добовляет на страницу.
     */
    renderBoard() {
        let result = this.generateBoard();
        document.body.insertAdjacentHTML("afterbegin", result);
    },

    /**
     * Метод выводит буквы с верху и с низу доски
     * @param {number} n 
     */
    generatorLetters(n) {
        let letters = ['', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', '']
        return `<td class='letters'>${letters[n]}</td>`;
    },

    /**
     * Метод выводит цыфры по бокам доски
     * @param {number} n 
     */
    generatorNumber(n) {
        let number = ['8', '8', '7', '7', '6', '6', '5', '5', '4', '4', '3', '3', '2', '2', '1', '1', '', '']
        return `<td class='number'>${number[n]}</td>`;
    },

    /**
     * Метод раставляет фигуры на доске
     * @param {number} x координата по оси х
     * @param {number} y координата по оси y
     */
    arrangeFigures(x, y) {
        if (x <= 8 && y == 2) {
            return "&#9823";
        } else if (x <= 8 && y == 7) {
            return "&#9817";
        } else if (x == 5 && y == 1) {
            return "&#9818";
        } else if (x == 5 && y == 8) {
            return "&#9812";
        } else if (x == 4 && y == 1) {
            return "&#9819";
        } else if (x == 4 && y == 8) {
            return "&#9813";
        } else if (x == 1 && y == 1 || x == 8 && y == 1) {
            return "&#9820";
        } else if (x == 1 && y == 8 || x == 8 && y == 8) {
            return "&#9814";
        } else if (x == 2 && y == 1 || x == 7 && y == 1) {
            return "&#9822";
        } else if (x == 2 && y == 8 || x == 7 && y == 8) {
            return "&#9816";
        } else if (x == 3 && y == 1 || x == 6 && y == 1) {
            return "&#9821";
        } else if (x == 3 && y == 8 || x == 6 && y == 8) {
            return "&#9815";
        } else {
            return " "
        }
    },

    /**
     * Метод генерирует игровое поле на основании размеров в конфиге.
     * @returns {string} сгенерированный html-код таблицы(игрового поля).
     */
    generateBoard() {
        let board = "";
        let nX = 0
        for (let y = 0; y < config.rowsCount; y++) {
            board += "<tr>";
            let blackX = (y + 1);
            let nY = 0
            for (let x = 0; x < config.colsCount; x++) {
                if (y == 0 || y == 9) {
                    board += this.generatorLetters(nY)
                    nY++
                } else if (x == 0 || x == 9) {
                    board += this.generatorNumber(nX)
                    nX++
                } else if (blackX % 2 == 0) {
                    board += `<td class='black' data-x="${x}" data-y="${y}">${this.arrangeFigures(x, y)}</td>`;
                } else {
                    board += `<td data-x="${x}" data-y="${y}">${this.arrangeFigures(x, y)}</td>`;
                }
                blackX++
            }
            board += "</tr>";
        }
        return `<table><tbody>${board}</tbody></table>`;
    },
};
renderer.renderBoard();