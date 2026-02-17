const nav = document.querySelector('nav')
const navButton = document.getElementById('nav-button')
const navCloseButton = document.getElementById('nav-close-button')
const navOverlay = document.getElementById('nav-overlay')

const changelogRoot = document.getElementById('changelog')

const responsiveEvent = window.matchMedia("only screen and (max-width: 768px)")

let navHidden = responsiveEvent.matches
nav.classList.toggle('hidden', navHidden)

const recalcResponsiveSize = () => {
    const sideWidth = `calc(${main.getBoundingClientRect().x}px - 32px)`

    nav.style.width = sideWidth
    changelogRoot.style.width = sideWidth
}

const recalcNavRight = (immediate = false) => {
    const outside = responsiveEvent.matches
        ? '-100%'
        : `calc(-${main.getBoundingClientRect().x}px - 32px - 2px)`

    const inside = responsiveEvent.matches
        ? '0'
        : '16px'

    if (immediate)
        nav.classList.toggle('no-transition', true)

    nav.style.right = navHidden ? outside : inside

    if (immediate)
        setTimeout(
            () => nav.classList.toggle('no-transition', false),
            100
        )
}

const toggleNav = (force = undefined) => {
    navHidden = (force !== undefined && !force) || !navHidden
    nav.classList.toggle('hidden', navHidden)
    recalcNavRight()
}

const recalcResponsive = (immediate = false) => {
    recalcResponsiveSize()
    recalcNavRight(immediate)
}

export default () => {
    recalcResponsive(true)

    navButton.addEventListener('click', toggleNav)
    navCloseButton.addEventListener('click', () => toggleNav(false))
    responsiveEvent.addEventListener('change', recalcResponsive)
    navOverlay.addEventListener('click', () => toggleNav(false))
}