import {postData} from "../services/requests";

const drop = () => {
    const fileInputs = document.querySelectorAll('[name="upload"]');

    ['dragenter', 'dragleave', 'dragover', 'drop'].forEach(eventName => {
        fileInputs.forEach(input => {
            input.addEventListener(eventName, preventDefaults);
        });
    });

    function preventDefaults(e) {
        e.preventDefault();
        e.stopPropagation();
    }

    function highlight(item) {
        item.closest('.file_upload').style.border = '5px solid #c818bc'; 
        item.closest('.file_upload').style.backgroundColor = 'rgba(0, 0, 0, 0.2)'; 
    }
    
    function unhighlight(item) {
        item.closest('.file_upload').style.border = 'none'; 

        if (item.closest('.calc_form')) {
            item.closest('.file_upload').style.backgroundColor = '#fff'; 
        } else if (item.closest('.main')) {
            item.closest('.file_upload').style.backgroundColor = '#f7e7e6'; 
        } else{
            item.closest('.file_upload').style.backgroundColor = '#ededed'; 
        }
    }

    ['dragenter', 'dragover'].forEach(eventName => {
        fileInputs.forEach(input => {
            input.addEventListener(eventName, () => highlight(input));
        });
    });

    ['dragleave', 'drop'].forEach(eventName => {
        fileInputs.forEach(input => {
            input.addEventListener(eventName, () => unhighlight(input));
        });
    });

    fileInputs.forEach(input => {
        input.addEventListener('drop', (e) => {
            input.files = e.dataTransfer.files;

            if (!input.hasAttribute('multiple')) {
                let dots;
                const arr = input.files[0].name.split('.');
    
                arr[0].length > 6 ? dots = '...' : dots = '.';
                const name = arr[0].substring(0, 6) + dots + arr[1];
                input.previousElementSibling.textContent = name;
            } else {
                input.previousElementSibling.textContent = `Загружено фалов: ${input.files.length}`;
            }
            
            if (input.closest('.main')) {
                const formData = new FormData();

                input.files.forEach((file, i) => {
                    formData.append(`${i + 1} image`, file, file.name);
                });

                postData('assets/server.php', formData)
                    .then(res => {
                        console.log(res);
                    })
                    .catch(() => {
                        console.log('Ошибка');
                    });
            }
        });
    });
};

export default drop;