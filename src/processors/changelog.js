export default changelogs =>
	changelogs.map(([hash, title]) => {
		const line = document.createElement('div')
		line.className = 'line'

		const hashLabel = document.createElement('code')
		hashLabel.className = 'hash jetbrains-mono'
		hashLabel.classList.toggle('latest', title.includes('origin/main'))
		hashLabel.classList.toggle('local-latest', title.includes('HEAD ->'))
		hashLabel.textContent = hash.substring(0, 7)
		hashLabel.title = hash

		const titleLabel = document.createElement('span')
		titleLabel.className = 'changelog-title'
		titleLabel.textContent = title.includes('origin/HEAD') || title.includes('HEAD ->')
			? title.replace(/^\(.+\)/, '')
			: title
		titleLabel.textContent = titleLabel.textContent.trim()
		titleLabel.title = title

		line.append(hashLabel, titleLabel)

		return line
	})