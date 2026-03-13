import * as processors from './processors/index.js'

const contents = await fetch('/content/index.json')
        .then(r => r.json())
        .catch(e => {
			console.error(e)
			return {}
		})
const changelogs = await fetch('/content/changelog.json')
		.then(r => r.json())
		.catch(e => {
			console.error(e)
			return []
		})

const currentKey = location.pathname.slice(1) || 'index'
const metadata = currentKey in contents
	? contents[currentKey]
	: contents['not-found']

const content = await fetch(metadata.content_path)
	.then(r => r.text())
	.then(text => text.replace(/^---[\r\n].*?[\r\n]---/s, ''))

const __info__ = Object.freeze({
	...metadata,
	explicit_metadata: Object.freeze(metadata.explicit_metadata),
	key: currentKey
})

Object.defineProperty(window, '__info__', {
	get: () => __info__,
	configurable: false
})

const contentContainer = document.getElementById('content')
const changelogContainer = document.getElementById('changelog-list')
const navContainer = document.getElementById('nav-list')

contentContainer.replaceChildren(...processors.content(content))
navContainer.replaceChildren(...processors.nav(contents))
changelogContainer.replaceChildren(...processors.changelog(changelogs))