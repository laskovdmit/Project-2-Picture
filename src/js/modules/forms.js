import {postData} from "../services/requests";

const forms = (total) => {
    const allForms = document.querySelectorAll('form'),
          inputs = document.querySelectorAll('input'),
          upload = document.querySelectorAll('[name="upload"]');

    const messageText = {
        loading: 'Загрузука...',
        finished: 'Спасибо! Скоро мы с вами свяжемся',
        error: 'Ошибка. Что-то пошло не так...',
        spinner: 'assets/img/spinner.gif',
        ok: 'assets/img/ok.png',
        fail: 'assets/img/fail.png'
    };

    const path = {
        designer: 'assets/server.php',
        question: 'assets/question.php'
    };

    const clearInputs = (form) => {
        inputs.forEach(item => item.value = "");
        upload.forEach(item => {
            item.previousElementSibling.textContent = 'Файл не выбран';
        });
        try {
            form.querySelector('textarea').value = "";
        } catch {}
    };

    upload.forEach(item => {
        item.addEventListener('input', () => {
            let dots;
            const arr = item.files[0].name.split('.');

            arr[0].length > 6 ? dots = '...' : dots = '.';
            const name = arr[0].substring(0, 6) + dots + arr[1];
            item.previousElementSibling.textContent = name;
        });
    });

    allForms.forEach(form => {
        form.addEventListener('submit', (e) => {
            e.preventDefault();

            const message = document.createElement('div');
            message.classList.add('status');
            form.parentNode.append(message);

            form.classList.add('animated', 'fadeOutUp');
            setTimeout(() => {
                form.style.display = 'none';
            }, 400);

            let statusImg = document.createElement('img');
            statusImg.setAttribute('src', messageText.spinner);
            statusImg.classList.add('animated', 'fadeInUp');
            message.append(statusImg);

            let textMessage = document.createElement('div');
            textMessage.textContent = messageText.loading;
            message.append(textMessage);

            const formData = new FormData(form);
            let api;

            if (form.closest('.calc')) {
                formData.append('sum', total.sum);
            }

            form.closest('.popup-design') || form.classList.contains('calc_form') ? api = path.designer : api = path.question;
            console.log(api);

            postData(api, formData)
                .then(res => {
                    console.log(res);
                    statusImg.setAttribute('src', messageText.ok);
                    textMessage.textContent = messageText.finished;
                })
                .catch(() => {
                    statusImg.setAttribute('src', messageText.fail);
                    textMessage.textContent = messageText.error;
                })
                .finally(() => {
                    clearInputs(form);
                    setTimeout(() => {
                        message.remove();
                        form.style.display = 'block';
                        form.classList.remove('fadeOutUp');
                        form.classList.add('fadeInUp');
                    }, 5000);
                });
        });
    });
};

export default forms;