const inputUpload = document.querySelector('.form__input_file-load');
const imageUpload = document.querySelector('#imgLoad');
const titleUpload = document.querySelector('.show-upload__tite');
const formatUpload = document.querySelector('.show-upload__format');
const deleteUpload = document.querySelector('.show-upload__icon-delete');

// функция по загрузке картинки
inputUpload.addEventListener('change', e => {
    let file = e.target.value
    let fortam = file.split('.')

    let fullTitle = file.replace(/^.*[\\\/]/, '')
    let subTitle = fullTitle.split('.')

    // на хосте должен коректно работать, в сборщике Parcel - надо настраивать статику.
    imageUpload.setAttribute('src', `./img/${fullTitle}`)

    titleUpload.textContent = subTitle[0]
    formatUpload.textContent = fortam[1]
});

// функция очистки (сет дефолтных значений)
deleteUpload.addEventListener('click', e => {
    e.preventDefault()

    imageUpload.setAttribute('src', './img/uploadDef.png')
    titleUpload.textContent = 'Select image'
    formatUpload.textContent = 'image format'
});


