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
const content = path ? contents[path] || 'not-found.md' : 'index.md'

const sidebar = document.querySelector('nav')

sidebar.style.display = 'block'
sidebar.style.width = `calc(${main.getBoundingClientRect().x}px - 32px - 32px)`
sidebar.append(
    ...Object
        .keys(contents)
        .flatMap((k) => {
            const e = document.createElement('a')
            e.innerText = k
            e.href = k

            return [e, ' ']
        })
)

addEventListener('resize', () => {
    sidebar.style.width = `calc(${main.getBoundingClientRect().x}px - 32px - 32px)`
})

if (content)
    fetch('/content/' + content)
        .then(async (r) => main.replaceChildren(
                ...postprocess(marked.parse(
                    preprocess(await r.text())
                ))
            )
        )
        .catch(console.error)