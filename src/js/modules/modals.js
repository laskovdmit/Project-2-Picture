const modals = () => {
    let btnPressed;
    const scroll = calcScroll();

    function calcScroll() {
        let div = document.createElement('div');

        div.style.width = '50px';
        div.style.height = '50px';
        div.style.overflowY ='scroll';
        div.style.visibility = 'hidden';
        
        document.body.appendChild(div);
        let scrollWidth = div.offsetWidth - div.clientWidth;
        div.remove();

        return scrollWidth;
    }

    function moveGiftPosition(moveStatus) {
        const gift = document.querySelector('.fixed-gift');

        if (gift && moveStatus === 'forward') {
            gift.style.right = +getComputedStyle(gift).right.replace(/px/, '') + scroll + 'px';
        }
        
        if (gift && moveStatus === 'back') {
            gift.style.right = "";
        }
    }

    function bindModal (triggerSelector, modalSelector, closeSelector, destroy = false) {
        const trigger = document.querySelectorAll(triggerSelector),
              modal = document.querySelector(modalSelector),
              close = document.querySelector(closeSelector);
              
        function showModal(visibleModal) {
            const windows = document.querySelectorAll('[data-modal]');

            windows.forEach(item => {
                item.style.display = 'none';
                item.classList.add('animated', 'fadeIn');
            });
            visibleModal.style.display = "block";

            document.body.style.overflow = "hidden";
            document.body.style.marginRight = `${scroll}px`;
            moveGiftPosition('forward');
        }

        function closeModal() {
            const windows = document.querySelectorAll('[data-modal]');

            windows.forEach(item => {
                item.style.display = 'none';
            });

            document.body.style.overflow = "";
            document.body.style.marginRight = '0px';
            moveGiftPosition('back');
        }

        trigger.forEach(item => {
            item.addEventListener('click', (e) => {
                if (e.target) {
                    e.preventDefault();
                }

                btnPressed = true;

                if (destroy) {
                    item.remove();
                }
                
                showModal(modal);
            });
        });
        
        close.addEventListener('click', () => closeModal());

        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                closeModal();
            }
        });
    }

    function showModalByTime(selector, time) {
        setTimeout(() => {
            let display;

            document.querySelectorAll('[data-modal]').forEach(item => {
                if (getComputedStyle(item).display !== 'none') {
                    display = "block";
                }
            });

            if (!display) {
                document.querySelector(selector).style.display = 'block';
                document.body.style.overflow = "hidden";
                
                document.body.style.marginRight = `${scroll}px`;
                moveGiftPosition('forward');
            }
        }, time);
    }

    function showByScroll(selector) {
        window.addEventListener('scroll', () => {
            let scrollHeight = Math.max(document.documentElement.scrollHeight, document.body.scrollHeight);

            if (!btnPressed && scrollHeight <= (document.documentElement.clientHeight + window.pageYOffset)) {
                document.querySelector(selector).click();
            }
        });
    }


    bindModal('.button-design', '.popup-design', '.popup-design .popup-close');
    bindModal('.button-consultation', '.popup-consultation', '.popup-consultation .popup-close');
    bindModal('.fixed-gift', '.popup-gift', '.popup-gift .popup-close', true);
    // showModalByTime('.popup-consultation', 60000);
    showByScroll('.fixed-gift');

};

export default modals;