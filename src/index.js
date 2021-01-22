import './styles.css';

// ----------------------------> Сделали импорт данных
// import menu from './menu.json'; 
// console.table(menu);
// ----------------------------> Создали шабон разметки и импортировали его

import ltemsTemplete from './template/card.hbs';


console.log('Hello');



let name = 'can';

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
        .catch(console.log('Ошибка!!!'));
};

fnFetch(name);


const input = document.querySelector('#name-input');
const output = document.querySelector('#name-output');

const fn = () => {
    if (input.value === '') {
        output.textContent = 'незнакомец';
        return;
    }
    output.textContent = input.value;
}

input.addEventListener('input', fn);




