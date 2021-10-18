const filter = (menuSelector, wrapperSelector, notFoundSelector, activeClass) => {
    const menu = document.querySelector(menuSelector),
          wrapper = document.querySelector(wrapperSelector),
          notFound = document.querySelector(notFoundSelector);

    function clearStyle() {
        wrapper.children.forEach(block => {
            block.style.display = 'none';
            block.classList.remove('animated', 'fadeIn');
        });

        menu.children.forEach(item => {
            item.classList.remove(activeClass);
        });

        notFound.style.display = 'none';
        notFound.classList.remove('animated', 'fadeIn');
    }

    menu.addEventListener('click', (e) => {
        const target = e.target;
        let i = 0;
        
        clearStyle();

        if (target && target.nodeName === 'LI') {
            wrapper.children.forEach(block => {
                if (block.classList.contains(target.className)) {
                    block.classList.add('animated', 'fadeIn');
                    block.style.display = "block";
                    i++;
                }
            });

            if (i === 0) {
                notFound.style.display = 'block';
                notFound.classList.add('animated', 'fadeIn');
            }

            target.classList.add(activeClass);
        }
    });
};

export default filter;