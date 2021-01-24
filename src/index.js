
// ----------------------------> Создали шабоны разметки и импортировали их
import cardTemplete from './template/card.hbs';
import listTemplete from './template/list.hbs';

// ----------------------------> Импортируем плагин уведомлений - PNotify
import { alert, info, error, defaultModules} from '../node_modules/@pnotify/core/dist/PNotify.js';
import "@pnotify/core/dist/PNotify.css";                     //---> Импортирует стилей
import '@pnotify/core/dist/BrightTheme.css';                 //---> Импортирует цветовую гамму
import 'material-design-icons/iconfont/material-icons.css'; //---> Импортирует иконки

// ----------------------------> Импортируем плагин уведомлений - PNotify
const PNotify = {
    title: 'Info',
    delay: 2500,          //---> Удаляется автоматически
    sticker: false,       //---> Удаляет стиккер
    closerHover: false,   //---> Видно иконку закрытия
}

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
        info({
            ...PNotify,
            text: 'Результат поиска > 10 стран. Введите более точное название страны.',
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

    error({
        ...PNotify,
        text: 'По вашему запросу ничего не найдено.',
    });
    
    return console.warn('Введите боллее корректное название')
}

const fnFetch = () => {
    fnFetchServer(input.value);
}

input.addEventListener('input', debounce((fnFetch), 1000));



