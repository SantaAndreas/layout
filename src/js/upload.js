const labelUpload = document.querySelector('.form__label_load');
const inputUpload = document.querySelector('.form__input_file-load');
const imageUpload = document.querySelector('#imgLoad');
const showUpload = document.querySelector('.show-upload');
const titleUpload = document.querySelector('.show-upload__tite');
const formatUpload = document.querySelector('.show-upload__format');
const deleteUpload = document.querySelector('.show-upload__icon-delete');
const formButton = document.querySelector('.form__button');
const completedText = document.querySelector('.form__completed-text');

let wasPostForm = false;

// function load image
inputUpload.addEventListener('change', (e) => {
    let file = e.target.value
    let fortam = file.split('.')

    let fullTitle = file.replace(/^.*[\\\/]/, '')
    let subTitle = fullTitle.split('.')

    // на хосте должен коректно работать, в сборщике Parcel - надо настраивать статику.
    imageUpload.setAttribute('src', `./img/${fullTitle}`)

    titleUpload.textContent = subTitle[0]
    formatUpload.textContent = fortam[1]
    formButton.removeAttribute('disabled')
});

labelUpload.addEventListener('click', () => {
    showUpload.style.opacity = 1
});

// function clear image
deleteUpload.addEventListener('click', (e) => {
    e.preventDefault()

    imageUpload.setAttribute('src', './img/uploadDef.png')
    titleUpload.textContent = ''
    formatUpload.textContent = ''
    showUpload.style.opacity = 0
    formButton.setAttribute('disabled', true)
    completedText.style.display = 'none'
    wasPostForm = false
});

// post file
formButton.addEventListener('click', (e) => {
    e.preventDefault()
    wasPostForm = true
    formButton.setAttribute('disabled', true)
    if (wasPostForm) {
        completedText.style.display = 'flex'
    } else {
        completedText.style.display = 'none'
    }
});


