console.log('Hello via Bun! in index.js');
console.log('Hello, World!');

import './js/piece-travails/piece-travails.js';

import './css/nav.css';
import './css/main.css';
import './css/style.css';
import './css/reset.css';
import './css/header.css';
import './css/footer.css';
import './css/buttons.css';
import './css/responsive.css';

import './css/piece-travails-section/main.css';
import './css/piece-travails-section/aside.css';
import './css/piece-travails-section/footer.css';
import './css/piece-travails-section/header.css';

//
import Knight from './media/img/knight.svg';

const body = document.querySelector('body');

const button = document.createElement('button');
button.classList = 'css-button-sliding-to-bottom--rose';
body.appendChild(button);
button.textContent = 'Click me!';
