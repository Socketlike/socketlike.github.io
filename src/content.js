import { marked } from 'https://unpkg.com/marked@17.0.1/lib/marked.esm.js'

import postprocess from '/src/postprocessor.js'

const main = document.querySelector('main')

const navContainer = document.getElementById('nav-container')

export default async () => {
    const contents = {
        ...await fetch('/content/index.json')
            .then((r) => r.json())
            .catch(console.error)
    }

    const path = location.pathname.slice(1)
    const content = path ? contents[path]?.path || '/content/not-found.md' : '/content/index.md'

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

    if (content)
        await fetch(content)
            .then((r) => r.text())
            .then((text) => text.replace(/---[\r\n].*?[\r\n]---/s, ''))
            .then((text) => main.replaceChildren(
                    ...postprocess(marked.parse(text))
                )
            )
            .catch(console.error)
}