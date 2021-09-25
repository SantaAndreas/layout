const links = document.querySelectorAll('.header__link');

links.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault()

        const linkHREF = link.getAttribute('href')
        document.querySelector(linkHREF).scrollIntoView({
            behavior: 'smooth',
            block: "start"
        })
    })
})