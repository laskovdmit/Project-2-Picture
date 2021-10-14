import modals from './modules/modals';
import sliders from './modules/sliders';
import forms from './modules/forms';
import mask from './modules/mask';
import checkTextInputs from './modules/checkTextInputs';

window.addEventListener('DOMContentLoaded', () => {
    'use strict';
    
    modals();
    sliders('.feedback-slider-item', 'horisontal', '.main-prev-btn', '.main-next-btn', 3000);
    sliders('.main-slider-item', 'vertical', '', '', 6000);
    forms();
    mask('[name="phone"]');
    checkTextInputs('[name="name"]');
    checkTextInputs('[name="message"]');
});