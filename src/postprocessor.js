const postprocessors = Object.freeze(
    [
        (root) => root
            .querySelectorAll('.github-only')
            .forEach((e) => e.remove()),
        
        // history "link" hack - part 2
        (root) => root
            .querySelectorAll('a[href^="/__secretevilpathnoonewoulduseonpurpose_history_"]')
            .forEach((e) => {
                const amount = Number(
                    new URL(e.href)
                        .pathname
                        .replace('/__secretevilpathnoonewoulduseonpurpose_history_', '')
                )

                e.href = ''

                if (!Number.isNaN(amount)) {
                    e.href = '/'
                    e.title = `go ${amount < 0 ? 'back' : 'forward'} by ${Math.abs(amount)} page${Math.abs(amount) !== 1 ? 's' : ''}`
                    e.addEventListener('click', (e) => {
                        e.preventDefault()
                        e.stopPropagation()

                        history.go(amount)
                    })
                }
            })
    ]
)

export default (content) => {
    const _main = document.createElement('main')
    _main.innerHTML = content

    postprocessors.forEach((postprocessor) => postprocessor(_main))

    return [..._main.childNodes]
}