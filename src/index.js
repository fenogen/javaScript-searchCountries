import './styles.css';

// ----------------------------> Сделали импорт данных
// import menu from './menu.json'; 
// console.table(menu);
// ----------------------------> Создали шабон разметки и импортировали его

import ltemsTemplete from './template/card.hbs';

var debounce = require('lodash.debounce');


console.log('Hello');


const input = document.querySelector('#name-input');

function fnFetch(name) {
    const url = `https://restcountries.eu/rest/v2/name/${name}`;
    return fetch(url)
        .then(responce => responce.json())
        .then(data => {
            console.log(data);
            const card = ltemsTemplete(data)
            const cardRef = document.querySelector('.js-menu');
            cardRef.insertAdjacentHTML('beforeend', card);
        })
            .catch(error => console.warn('Ошибка!!!'));  // дорабоатать
    };



const fn = () => {


    fnFetch(input.value);
}

input.addEventListener('input', debounce((fn), 1000));

// 0. Очистка контанта при добавлении 
// 1. Ограничить кооличесвто иформации на страницу
// 2. Оповещение


