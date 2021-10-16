const accordion = (triggerSelector, blockSelector) => {
    const triggers = document.querySelectorAll(triggerSelector),
          blocks = document.querySelectorAll(blockSelector);

    triggers.forEach((btn, i) => {
        btn.addEventListener('click', function() {
            triggers.forEach(item => {
                if (item.classList.contains('active-style') && item !== this) {
                    item.classList.toggle('active-style');
                    item.nextElementSibling.style.maxHeight = '0px';
                    item.nextElementSibling.classList.toggle('active-content');
                }
            });

            this.classList.toggle('active-style');
            this.nextElementSibling.classList.toggle('active-content');
            
            if (this.classList.contains('active-style')) {
                this.nextElementSibling.style.maxHeight = this.nextElementSibling.scrollHeight + 80 + 'px';
            } else {
                this.nextElementSibling.style.maxHeight = '0px';
            }
        });
    });
};

export default accordion;