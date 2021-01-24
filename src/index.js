import './styles.css';


// ----------------------------> Импортирт плагина уведомлений - PNotify
import { alert, defaultModules } from 'node_modules/@pnotify/core/dist/PNotify.js';
import * as PNotifyMobile from 'node_modules/@pnotify/mobile/dist/PNotifyMobile.js';

// ----------------------------> Создали шабон разметки и импортировали его
import cardTemplete from './template/card.hbs';
import listTemplete from './template/list.hbs';

// ----------------------------> Импортировали ф-ю debounce
var debounce = require('lodash.debounce');


console.log('Hello');

const input = document.querySelector('#name-input');

function fnFetchServer(name) {
    const url = `https://restcountries.eu/rest/v2/name/${name}`;
    return fetch(url)
        .then(responce => responce.json())
        .then(data => fnTemplate(data))
        .catch(() => console.warn('Ошибка связи с сервером'));  // дорабоатать
};

const fnTemplate = (data) => {
    console.log(data);
    const boxRef = document.querySelector('.js-search');
    boxRef.innerHTML = '';
    
    if (data.length > 10) {
        console.log('Укажите более точно название страны');
        defaultModules.set(PNotifyMobile, {});
        alert({
            text: 'Notice me, senpai!'
        });
        return;
    }
    if (data.length === 1) {
        const template = cardTemplete(data);
        boxRef.insertAdjacentHTML('beforeend', template);
        return;
    }
    if (data.length <= 10 && data.length > 2) {
        const template = listTemplete(data);
        boxRef.insertAdjacentHTML('beforeend', template);
        return;
    }

    return console.warn('Введите боллее корректное название')
}


const fnFetch = () => {
    fnFetchServer(input.value);
}

input.addEventListener('input', debounce((fnFetch), 1000));



