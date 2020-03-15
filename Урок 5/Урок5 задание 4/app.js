'use strict';

const buttons = document.querySelectorAll('button');

buttons.forEach(function(button) {
    button.addEventListener('click', buttonClickHandler);
});

function buttonClickHandler(event){
    event.target.parentNode.querySelector('img').style.display = 'none';
    event.target.parentNode.getElementsByClassName('desc')["0"].style.display='block';
    event.target.innerText = "Отмена"
}



