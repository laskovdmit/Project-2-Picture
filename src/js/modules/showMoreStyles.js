import {getResource} from '../services/requests';

const showMoreStyles = (trigger, wrapper) => {
    const btn = document.querySelector(trigger);

    btn.addEventListener('click', function() {
        getResource('assets/db.json')
            .then(res => createCards(res.styles))
            .catch(() => {
                const div = document.createElement('div');
                div.style.cssText = `
                    text-align: center;
                    font-size: 3rem;
                    font-weight: bold;
                    margin: 40px 0;
                `;
                div.textContent = 'Что-то пошло не так...';
                document.querySelector(wrapper).appendChild(div);
            });

        this.style.visibility = 'hidden';
    });

    function createCards(response) {
        response.forEach(({src, title, link}) => {
            let card = document.createElement('div');

            card.classList.add('animated', 'fadeInUp', 'col-sm-3', 'col-sm-offset-0', 'col-xs-10', 'col-xs-offset-1');

            card.innerHTML = `
            <div class=styles-block>
                <img src="${src}" alt>
                <h4>${title}</h4>
                <a href="${link}">Подробнее</a>
            </div>
            `;

            document.querySelector(wrapper).appendChild(card);
        });
    }
};

export default showMoreStyles;