const postprocessors = Object.freeze(
    [
        (root) => root
            .querySelectorAll('.github-only')
            .forEach((e) => e.remove())
    ]
)

export default (content) => {
    const _main = document.createElement('main')
    _main.innerHTML = content

    postprocessors.forEach((postprocessor) => postprocessor(_main))

    return [..._main.childNodes]
}