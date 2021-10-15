import modals from './modules/modals';
import sliders from './modules/sliders';
import forms from './modules/forms';
import mask from './modules/mask';
import checkTextInputs from './modules/checkTextInputs';
import showMoreStyles from './modules/showMoreStyles';
import calc from './modules/calc';
import filter from './modules/filter';
import pictureSize from './modules/pictureSize';
import accordion from './modules/accordion';

window.addEventListener('DOMContentLoaded', () => {
    'use strict';
    
    let sumObj = {};

    modals();
    sliders('.feedback-slider-item', 'horisontal', '.main-prev-btn', '.main-next-btn', 3000);
    sliders('.main-slider-item', 'vertical', '', '', 6000);
    forms(sumObj);
    mask('[name="phone"]');
    checkTextInputs('[name="name"]');
    checkTextInputs('[name="message"]');
    showMoreStyles('.button-styles', '#styles .row');
    calc(sumObj, '#size', '#material', '#options', '.promocode', '.calc-price');
    filter('.portfolio-menu', '.portfolio-wrapper', '.portfolio-no', 'active');
    pictureSize('.sizes-block');
    accordion('.accordion-heading', '.accordion-block');
});