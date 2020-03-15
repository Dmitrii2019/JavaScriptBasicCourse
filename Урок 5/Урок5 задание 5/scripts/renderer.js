let renderer = {

    /**
     * Метод рисует игровое поле и игрока на нем.
     */
    renderBoard() {
        let result = this.generateBoard();
        document.body.insertAdjacentHTML("afterbegin", result);
    },
	
	generatorLetters(n){
		let letters = ['', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', '']
		return `<td class='letters'>${letters[n]}</td>`;
	},
	
	generatorNumber(n){
		let number = ['8', '8', '7', '7', '6', '6', '5', '5', '4','4', '3', '3', '2', '2', '1', '1', '', '']
		return `<td class='number'>${number[n]}</td>`;
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
				if (y == 0 || y == 9){
					board += renderer.generatorLetters(nY)
					nY++
				}else if (x == 0 || x == 9){
					board += renderer.generatorNumber(nX)
					nX++
				} else if (blackX % 2 == 0){
					board += `<td class='black' data-x="${x}" data-y="${y}"></td>`;
				} else {
					board += `<td data-x="${x}" data-y="${y}"></td>`;
				}
                blackX++
            }
            board += "</tr>";
        }
        return `<table><tbody>${board}</tbody></table>`;
    },
};
renderer.renderBoard();