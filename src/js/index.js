require('jquery');
require('popper.js');
require('bootstrap');

window.$ = window.jQuery = module.exports;

import Vue from 'vue';
import Kobold from './app/Kobold';

const koboldApp = new Vue(Kobold).$mount('#app');