import { marked } from 'https://cdn.jsdelivr.net/npm/marked@17.0.1/lib/marked.esm.js'
import preprocess from '/src/preprocessor.js'

const CONTENTS = {
    main: "/content/index.md",
    music: "/content/music.md",
    "not-found": "/content/not-found.md"
}

const main = document.querySelector('main')

const path = location.pathname.slice(1).split('/')
const content = path?.[0]
    ? path.reduce((prev, cur) => prev?.[cur], CONTENTS) || CONTENTS['not-found']
    : CONTENTS.main

if (content)
    fetch(content)
        .then(async (r) => main.innerHTML = marked.parse(
            preprocess(await r.text())
        ))
        .catch(console.error)

const sidebar = document.querySelector('nav')

sidebar.style.display = 'block'
sidebar.style.width = `calc(${main.getBoundingClientRect().x}px - 32px - 32px)`

window.onresize = () => {
    sidebar.style.width = `calc(${main.getBoundingClientRect().x}px - 32px - 32px)`
}