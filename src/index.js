import { marked } from 'https://cdn.jsdelivr.net/npm/marked@17.0.1/lib/marked.esm.js'
import preprocess from '/src/preprocessor.js'
import postprocess from '/src/postprocessor.js'

const contents = {
    ...await fetch('/content/index.json')
        .then((r) => r.json())
        .catch(console.error)
}

const main = document.querySelector('main')

const path = location.pathname.slice(1)
const content = path ? contents[path]?.path || '/content/not-found.md' : '/content/index.md'

const nav = document.querySelector('nav')
const navContainer = document.getElementById('nav-container')
const navButton = document.getElementById('nav-button')
const navCloseButton = document.getElementById('nav-close-button')
const navOverlay = document.getElementById('nav-overlay')

const changelogRoot = document.getElementById('changelog')
const changelogContainer = document.getElementById('changelog-container')

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

recalcResponsive(true)

navContainer.replaceChildren(
    ...Object
        .entries(contents)
        .filter(([_, { metadata }]) => !metadata?.delisted)
        .flatMap(([name, { metadata }]) => {
            const e = document.createElement('a')
            e.innerText = metadata?.name || name

            const path = metadata?.path || name
            e.href = path.startsWith('/') ? path : '/' + path

            return [e, ' ']
        })
)

navButton.addEventListener('click', toggleNav)
navCloseButton.addEventListener('click', () => toggleNav(false))
responsiveEvent.addEventListener('change', recalcResponsive)
navOverlay.addEventListener('click', () => toggleNav(false))

if (content)
    fetch(content)
        .then((r) => r.text())
        .then((text) => text.replace(/---[\r\n].*?[\r\n]---/s, ''))
        .then((text) => main.replaceChildren(
                ...postprocess(marked.parse(
                    preprocess(text)
                ))
            )
        )
        .catch(console.error)

const changelog = await fetch('/content/changelog.json')
        .then((r) => r.json())
        .catch(console.error)

if (changelog)
    changelogContainer.replaceChildren(
        ...changelog.map(([hash, title]) => {
            const line = document.createElement('div')
            line.className = 'line'
            
            const hashLabel = document.createElement('code')
            hashLabel.className = 'hash'
            hashLabel.classList.toggle('latest', title.includes('origin/main'))
            hashLabel.classList.toggle('local-latest', title.includes('HEAD ->'))
            hashLabel.textContent = hash.substring(0, 7)
            hashLabel.title = hash

            const titleLabel = document.createElement('div')
            titleLabel.className = 'changelog-title'
            titleLabel.textContent = title.includes('origin/HEAD') || title.includes('HEAD ->')
                ? title.replace(/^\(.+\)/, '')
                : title
            titleLabel.title = title

            line.append(hashLabel, titleLabel)

            return line
        })
    )