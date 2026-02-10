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

const sidebar = document.querySelector('nav')

sidebar.style.display = 'block'
sidebar.style.width = `calc(${main.getBoundingClientRect().x}px - 32px - 32px)`
sidebar.append(
    ...Object
        .entries(contents)
        .filter(([_, { metadata }]) => !metadata?.unlinked)
        .flatMap(([name, { metadata }]) => {
            const e = document.createElement('a')
            e.innerText = metadata?.name || name

            const path = metadata?.path || name
            e.href = path.startsWith('/') ? path : '/' + path

            return [e, ' ']
        })
)

addEventListener('resize', () => {
    sidebar.style.width = `calc(${main.getBoundingClientRect().x}px - 32px - 32px)`
})

if (content)
    fetch(content)
        .then(async (r) => await r.text())
        .then((text) => text.replace(/---[\r\n].*?[\r\n]---/s, ''))
        .then((text) => main.replaceChildren(
                ...postprocess(marked.parse(
                    preprocess(text)
                ))
            )
        )
        .catch(console.error)