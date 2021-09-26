// DOM elements
const leftArrow = document.querySelector('.slider__arrow_left');
const rigthArrow = document.querySelector('.slider__arrow_rigth');

const leftDot = document.querySelector('.slider__dot_left');
const middleDot = document.querySelector('.slider__dot_middle');
const rigthDot = document.querySelector('.slider__dot_rigth');

// Length array images in slider
const allImages = document.querySelectorAll('.slider__item');

// size (width) one image in slider 
let widthImage = document.querySelector('.slider__wrapper-element').clientWidth;

// wrapper all images
const sliderElementsBlock = document.querySelector('.slider__elements');

// start position slader images
let startPosition = 0;

// prev arrow slide
leftArrow.addEventListener('click', (e) => {
    if (startPosition <= 0) {
        sliderElementsBlock.style.left = (allImages.length * widthImage) + 'px'
        startPosition = allImages.length * widthImage
    }

    startPosition -= widthImage
    console.log(startPosition)
    sliderElementsBlock.style.left = -startPosition + 'px'
});

// next arrow slide
rigthArrow.addEventListener('click', (e) => {
    startPosition += widthImage
    sliderElementsBlock.style.left = -startPosition + 'px'

    if (startPosition >= allImages.length * widthImage) {
        sliderElementsBlock.style.left = 0 + 'px'
        startPosition = 0
    }
});

// for correct check resize window 
window.addEventListener('resize', () => {
    console.log('resize')
    widthImage = document.querySelector('.slider__wrapper-element').clientWidth;
})