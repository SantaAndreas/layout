// DOM elements
const leftArrow = document.querySelector('.slider__arrow_left');
const rigthArrow = document.querySelector('.slider__arrow_rigth');

const leftDot = document.querySelector('.slider__dot_left');
const middleDot = document.querySelector('.slider__dot_middle');
const rigthDot = document.querySelector('.slider__dot_rigth');

// all dots navigation
const dots = document.querySelectorAll('.slider__dot');

// Length array images in slider
const allImages = document.querySelectorAll('.slider__item');

// size (width) one image in slider 
let widthImage = document.querySelector('.slider__wrapper-element').clientWidth;

// wrapper all images
const sliderElementsBlock = document.querySelector('.slider__elements');

// start position slider images
let startPosition = 0;
let currentActiveDot = 0;

// prev arrow slide
leftArrow.addEventListener('click', (e) => {
    if (startPosition <= 0) {
        sliderElementsBlock.style.left = (allImages.length * widthImage) + 'px'
        startPosition = allImages.length * widthImage
    }

    if (currentActiveDot === 0) {
        currentActiveDot = allImages.length
    }

    startPosition -= widthImage
    sliderElementsBlock.style.left = -startPosition + 'px'
    currentActiveDot--

    dots.forEach((dot, indexDot) => {
        dot.classList.remove('slider__dot_active')
        if (currentActiveDot === indexDot) {
            dot.classList.add('slider__dot_active')
        }
    })
});

// next arrow slide
rigthArrow.addEventListener('click', (e) => {

    startPosition += widthImage
    sliderElementsBlock.style.left = -startPosition + 'px'
    currentActiveDot++

    if (currentActiveDot >= allImages.length) {
        currentActiveDot = 0
    }

    if (startPosition >= allImages.length * widthImage) {
        sliderElementsBlock.style.left = 0 + 'px'
        startPosition = 0
    }

    dots.forEach((dot, indexDot) => {
        dot.classList.remove('slider__dot_active')
        if (currentActiveDot === indexDot) {
            dot.classList.add('slider__dot_active')
        }
    })
});

// for correct check resize window 
window.addEventListener('resize', () => {
    widthImage = document.querySelector('.slider__wrapper-element').clientWidth
});

// function dot-change element 
dots.forEach((item, index) => {
    item.addEventListener('click', (e) => {
        e.preventDefault()
        dots.forEach(subItem => subItem.classList.remove('slider__dot_active'))
        item.classList.add('slider__dot_active')

        sliderElementsBlock.style.left = -(index * widthImage) + 'px'
        startPosition = (index * widthImage)
    })
})