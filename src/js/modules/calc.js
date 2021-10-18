import { getResource } from '../services/requests';

const calc = (total, size, material, options, promocode, output) => {
    const sizeSelect = document.querySelector(size),
          materialSelect = document.querySelector(material),
          optionsSelect = document.querySelector(options),
          promocodeInput = document.querySelector(promocode),
          outputField = document.querySelector(output);

    function calcCurrentPrice() {
        getResource('/assets/price.json')
            .then(res => {
                total.sum = Math.floor((+res.size[sizeSelect.value] * +res.material[materialSelect.value]) + +res.options[optionsSelect.value]);

                if (sizeSelect.value === '' || materialSelect.value === '') {
                    outputField.textContent = 'Для расчета нужно выбрать размер картины и материал картины';
                } else if (promocodeInput.value === 'IWANTPOPART') {
                    total.sum = Math.floor(+total.sum * 0.7);
                    outputField.textContent = `${total.sum} руб.`;
                } else {
                    outputField.textContent = `${total.sum} руб.`;
                }
            });
    }

    sizeSelect.addEventListener('change', calcCurrentPrice);
    materialSelect.addEventListener('change', calcCurrentPrice);
    optionsSelect.addEventListener('change', calcCurrentPrice);
    promocodeInput.addEventListener('input', calcCurrentPrice);
};

export default calc;