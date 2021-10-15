const accordion = (triggerSelector, blockSelector) => {
    const triggers = document.querySelectorAll(triggerSelector),
          blocks = document.querySelectorAll(blockSelector);

    triggers.forEach(btn => {
        btn.addEventListener('click', function() {
            triggers.forEach(item => item.classList.remove('active-style'));

            blocks.forEach(item => {
                item.style.maxHeight = '0px';
                item.classList.remove('active-content');
            });

            this.classList.add('active-style');
            this.nextElementSibling.classList.add('active-content');
            
            if (this.classList.contains('active-style')) {
                this.nextElementSibling.style.maxHeight = this.nextElementSibling.scrollHeight + 80 + 'px';
            } else {
                this.nextElementSibling.style.maxHeight = '0px';
            }
        });
    });
};

export default accordion;