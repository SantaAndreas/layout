const allInputs = document.querySelectorAll('.form__element');
const inputName = document.querySelector('#inputName');
const selectGender = document.querySelector('#selectGender');
const inputCountry = document.querySelector('#inputCountry');
const inputCity = document.querySelector('#inputCity');
const inputBirth = document.querySelector('#inputBirth');

const secondGroup = document.querySelector('.form__element-group_second');
const uploadGroup = document.querySelector('.form__element-group_upload');
const showUpload = document.querySelector('.show-upload');
const buttonGroup = document.querySelector('.form__element-group_button');

let inputNameValid = false;
let selectGenderValid = false;
let inputCountryValid = false;
let inputCityValid = false;
let inputBirthValid = false;

// onblur delete classes
allInputs.forEach(item => {
    item.addEventListener('blur', () => {
        if (item.classList.contains('form__input_valid')) {
            item.classList.remove('form__input_valid')
        }
    })
})

// input name
inputName.addEventListener('focus', e => {
    let currentValue = e.target.value;
    if (!currentValue) {
        inputName.classList.add('form__input_not-valid')
    }
});

inputName.addEventListener('input', checkNameValid);

function checkNameValid(e) {
    let currentValue = e.target.value;

    if (currentValue.length >= 2) {
        inputName.classList.remove('form__input_not-valid')
        inputName.classList.add('form__input_valid')
        inputNameValid = true
        checkerFirstGroup()
    }
    if (currentValue.length < 2) {
        inputName.classList.remove('form__input_valid')
        inputName.classList.add('form__input_not-valid')
        inputNameValid = false
        checkerFirstGroup()
    }
}

// select gender
selectGender.addEventListener('focus', e => {
    let currentValue = e.target.value;
    if (currentValue === 'default') {
        selectGender.classList.remove('form__input_valid')
        selectGender.classList.add('form__input_not-valid')
    }
});

selectGender.addEventListener('input', selectValid);

function selectValid(e) {
    let currentValue = e.target.value;

    if (currentValue === 'default') {
        selectGender.classList.remove('form__input_valid')
        selectGender.classList.add('form__input_not-valid')
        selectGenderValid = false
        checkerFirstGroup()
    } else {
        selectGender.classList.remove('form__input_not-valid')
        selectGender.classList.add('form__input_valid')
        selectGenderValid = true
        checkerFirstGroup()
    }
}

// function checker if first group input === true ? rflex second group else none 

function checkerFirstGroup() {

    if (inputNameValid && selectGenderValid) {
        secondGroup.style.display = 'flex'
    } else {
        secondGroup.style.display = 'none'
    }
}

// input Country
inputCountry.addEventListener('focus', e => {
    let currentValue = e.target.value;
    if (!currentValue) {
        inputCountry.classList.add('form__input_not-valid')
    }
});

inputCountry.addEventListener('input', chekCountryValid);

function chekCountryValid(e) {
    let currentValue = e.target.value;

    if (currentValue.length >= 2) {
        inputCountry.classList.remove('form__input_not-valid')
        inputCountry.classList.add('form__input_valid')
        inputCountryValid = true
    }
    if (currentValue.length < 2) {
        inputCountry.classList.remove('form__input_valid')
        inputCountry.classList.add('form__input_not-valid')
        inputCountryValid = false
    }
}

// input Country
inputCity.addEventListener('focus', e => {
    let currentValue = e.target.value;
    if (!currentValue) {
        inputCity.classList.add('form__input_not-valid')
    }
});

inputCity.addEventListener('input', chekCityValid);

function chekCityValid(e) {
    let currentValue = e.target.value;

    if (currentValue.length >= 2) {
        inputCity.classList.remove('form__input_not-valid')
        inputCity.classList.add('form__input_valid')
        inputCityValid = true
    }
    if (currentValue.length < 2) {
        inputCity.classList.remove('form__input_valid')
        inputCity.classList.add('form__input_not-valid')
        inputCityValid = false
    }
}

// input birth
inputBirth.addEventListener('focus', e => {
    let currentValue = e.target.value;
    if (!currentValue) {
        inputBirth.classList.add('form__input_not-valid')
    }
});

inputBirth.addEventListener('input', checkerBirth)

// check valid input birth
function checkerBirth(e) {

    let currentValue = e.target.value;

    let dotLetter = '.'

    let fullBirthMask = []

    if (currentValue[0]) {
        fullBirthMask = [currentValue[0]].join('')
        inputBirth.value = fullBirthMask
    }

    if (currentValue[0] && currentValue[1]) {
        fullBirthMask = [
            currentValue[0],
            currentValue[1],
            dotLetter].join('')
        inputBirth.value = fullBirthMask
    }

    if (currentValue[0]
        && currentValue[1]
        && currentValue[2]
        && currentValue[3]
    ) {
        fullBirthMask = [
            currentValue[0],
            currentValue[1],
            dotLetter,
            currentValue[3]
        ].join('')
        inputBirth.value = fullBirthMask
    }

    if (currentValue[0]
        && currentValue[1]
        && currentValue[2]
        && currentValue[3]
        && currentValue[4]
    ) {
        fullBirthMask = [
            currentValue[0],
            currentValue[1],
            dotLetter,
            currentValue[3],
            currentValue[4],
            dotLetter,
        ].join('')
        inputBirth.value = fullBirthMask
    }

    if (currentValue[0]
        && currentValue[1]
        && currentValue[2]
        && currentValue[3]
        && currentValue[4]
        && currentValue[5]
    ) {
        fullBirthMask = [
            currentValue[0],
            currentValue[1],
            dotLetter,
            currentValue[3],
            currentValue[4],
            dotLetter,
            currentValue[6]
        ].join('')
        inputBirth.value = fullBirthMask
    }

    if (currentValue[0]
        && currentValue[1]
        && currentValue[2]
        && currentValue[3]
        && currentValue[4]
        && currentValue[5]
        && currentValue[6]
    ) {
        fullBirthMask = [
            currentValue[0],
            currentValue[1],
            dotLetter,
            currentValue[3],
            currentValue[4],
            dotLetter,
            currentValue[6],
            currentValue[7]
        ].join('')
        inputBirth.value = fullBirthMask
    }

    if (currentValue[0]
        && currentValue[1]
        && currentValue[2]
        && currentValue[3]
        && currentValue[4]
        && currentValue[5]
        && currentValue[6]
        && currentValue[7]
    ) {
        fullBirthMask = [
            currentValue[0],
            currentValue[1],
            dotLetter,
            currentValue[3],
            currentValue[4],
            dotLetter,
            currentValue[6],
            currentValue[7],
            currentValue[8]
        ].join('')
        inputBirth.value = fullBirthMask
    }

    if (currentValue[0]
        && currentValue[1]
        && currentValue[2]
        && currentValue[3]
        && currentValue[4]
        && currentValue[5]
        && currentValue[6]
        && currentValue[7]
        && currentValue[8]
    ) {
        fullBirthMask = [
            currentValue[0],
            currentValue[1],
            dotLetter,
            currentValue[3],
            currentValue[4],
            dotLetter,
            currentValue[6],
            currentValue[7],
            currentValue[8],
            currentValue[9]
        ].join('')
        inputBirth.value = fullBirthMask
    }

    if (
        (inputBirth.value.length < 10) ||
        (currentValue[0] >= 4) ||
        (currentValue[0] >= 3 && currentValue[1] >= 2) ||
        (currentValue[3] > 1) ||
        (currentValue[4] > 2) ||
        (currentValue[6] > 3) ||
        (currentValue[6] >= 2 && currentValue[7] > 0) ||
        (currentValue[6] == 1 && currentValue[7] < 9) ||
        (currentValue[6] >= 2 && currentValue[8] > 1) ||
        (currentValue[6] >= 2 && currentValue[8] >= 1 && currentValue[9] > 1)
    ) {
        console.log('false')
        inputBirth.classList.remove('form__input_valid')
        inputBirth.classList.add('form__input_not-valid')
        inputBirthValid = false
        checkerSecondGroup()
        return false
    }

    console.log('true')
    inputBirth.classList.remove('form__input_not-valid')
    inputBirth.classList.add('form__input_valid')
    inputBirthValid = true
    checkerSecondGroup()
}

// function checker second group
function checkerSecondGroup() {

    if (inputCountryValid && inputCityValid && inputBirthValid) {
        uploadGroup.style.display = 'flex'
        showUpload.style.display = 'flex'
        buttonGroup.style.display = 'flex'
    } else {
        uploadGroup.style.display = 'none'
        showUpload.style.display = 'none'
        buttonGroup.style.display = 'none'
    }
}

