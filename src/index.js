console.log('Hello via Bun! in index.js');
console.log('Hello, World!');

import './js/piece-travails/piece-travails';

import './css/reset.css';
import './css/header.css';
import './css/footer.css';
import './css/style.css';

import './css/piece-travails/aside.css';
import './css/piece-travails/footer.css';
import './css/piece-travails/header.css';
import './css/piece-travails/main.css';

//
import Knight from './media/img/knight.svg';

const body = document.querySelector('body');

const myImage = new Image();
myImage.src = Knight;
body.appendChild(myImage); //  success
