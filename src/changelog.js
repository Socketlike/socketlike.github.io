const changelogContainer = document.getElementById('changelog-container')

export default async () => {
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
}