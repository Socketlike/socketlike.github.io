const { index, changelog } = await fetch('/content/index.json')
	.then(r => r.json())

const navList = document.getElementById('nav-list')
const changelogList = document.getElementById('changelog-list')
const contentContainer = document.getElementById('content')

for (const { path: [ path ], title, delisted } of index) {
	if (delisted) continue

	const a = document.createElement('a')
	a.href = path
	a.innerText = title
	a.classList.toggle('no-default')

	navList.append(a, ' ')
}

for (const logLine of changelog.split('\n')) {
	const hash = logLine.slice(0, 40)
	const title = logLine.slice(41)

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

	changelogList.appendChild(line)
}

import { Marked } from 'https://unpkg.com/marked@17.0.1/lib/marked.esm.js'
import purifier from 'https://unpkg.com/dompurify@3.3.1/dist/purify.es.mjs'

const marked = new Marked()

const page =
	index.find(({ path: [ path ] }) => location.pathname === path)
	|| index.find(({ path: [ path ] }) => '/not-found' === path)

const content = await fetch(page.path[1])
	.then(r => r.text())
	.then(text => text.replace(/---[\r\n].*?[\r\n]---/s, ''))

const placeholders = page.placeholders || {}

const placeholderIdentifiers = {
	pageTitle: page.title,
	pagePath: page.path[0],
	pageContentPath: page.path[1],
	pageDelisted: page.delisted,

	locationOrigin: location.origin,
	locationPathName: location.pathname
}

function getRelativeTimestampFormatParameters(value) {
	value = -value

	const sign = Math.sign(value)

	value = sign * Math.floor(sign * value / 1000)

	const abs = Math.abs(value)

	if (abs >= 365 * 24 * 60 * 60)
		return [sign * Math.floor(sign * value / (365 * 24 * 60 * 60)), 'years']

	if (abs >= 30 * 24 * 60 * 60)
		return [sign * Math.floor(sign * value / (30 * 24 * 60 * 60)), 'months']

	if (abs >= 7 * 24 * 60 * 60)
		return [sign * Math.floor(sign * value / (7 * 24 * 60 * 60)), 'weeks']

	if (abs >= 24 * 60 * 60)
		return [sign * Math.floor(sign * value / (24 * 60 * 60)), 'days']

	if (abs >= 60 * 60)
		return [sign * Math.floor(sign * value / (60 * 60)), 'hours']

	if (abs > 60)
		return [sign * Math.floor(sign * value / 60), 'minutes']

	return [value, 'seconds']
}

function tokenizePlaceholder(placeholder) {
	const tokens = []

	while (true) {
		if (!placeholder) break

		const leftDelimiterLoc = placeholder.indexOf('$')
		const rightDelimiterLoc = placeholder.indexOf('$', leftDelimiterLoc + 1)

		if (leftDelimiterLoc === -1 || rightDelimiterLoc === -1) {
			tokens.push({ type: 'text', body: placeholder })
			break
		}

		if (leftDelimiterLoc > 0)
			tokens.push({ type: 'text', body: placeholder.slice(0, leftDelimiterLoc) })

		const body = placeholder.slice(leftDelimiterLoc + 1, rightDelimiterLoc).trim()

		tokens.push({ type: body.match(/^\w+$/) ? 'identifier' : 'action', body })	

		placeholder = placeholder.slice(rightDelimiterLoc + 1)
	}

	return tokens
}

const placeholderActionRunners = {
	timestamp(args) {
		const timestamp = args.find((arg) => typeof arg === 'number')

		if (!Number.isInteger(timestamp))
			return '<span class="timestamp invalid">(invalid timestamp)</span>'

		const tooltip = new Intl.DateTimeFormat('en-US', {
			dateStyle: 'full',
			timeStyle: 'short'
		}).format(timestamp)

		const raw = args.includes('raw')

		const relative = args.includes('relative')

		if (relative) {
			const now = Date.now()

			const params = getRelativeTimestampFormatParameters(now - timestamp)

			return raw
				? `${-params[0]} ${params[1]}`
				: `<span class="timestamp" title="${tooltip}">${
				new Intl.RelativeTimeFormat('en-US')
					.format(...params)
			}</span>`
		}

		const long = args.includes('long')

		return `<span class="timestamp" title="${tooltip}">${
			long
				? tooltip
				: new Intl.DateTimeFormat('en-US', {
					dateStyle: 'medium',
					timeStyle: 'short'
				}).format(timestamp)
		}</span>`
	}
}

function runPlaceholderAction(token) {
	if (token.type !== 'action')
		return null

	const actionName = token.body.match(/^\w+/)?.[0]

	if (!(actionName && actionName in placeholderActionRunners))
		return null

	let argString = token.body.slice(actionName.length).trim()

	if (!(argString.startsWith('(') && argString.endsWith(')')))
		return null

	argString = argString.slice(1).slice(0, -1).trim()

	const args = []

	while (true) {
		if (!argString.trim()) break

		const stringDelimiter = argString.match(/^['"`]/)?.[0]

		if (stringDelimiter) {
			const end = argString.indexOf(stringDelimiter, 1)

			if (end === -1)
				return null

			const string = argString.slice(1, end)

			args.push(string)

			argString = argString.slice(end + 1).trim()

			if (argString.startsWith(',')) {
				argString = argString.slice(1).trim()
				continue
			} else
				break
		}

		const number = argString.match(/^-?[0-9]+(\.[0-9]+)?/)?.[0]

		if (number) {
			args.push(Number(number))

			argString = argString.slice(number.length).trim()

			if (argString.startsWith(',')) {
				argString = argString.slice(1).trim()
				continue
			} else
				break
		}

		const identifier = argString.match(/^\w+/)?.[0]

		if (identifier) {
			args.push(placeholderIdentifiers[identifier] || null)
			
			argString = argString.slice(identifier.length).trim()

			if (argString.startsWith(',')) {
				argString = argString.slice(1).trim()
				continue
			} else
				break
		}
	}

	return placeholderActionRunners[actionName](args)
}

function parsePlaceholderTokens(tokens) {
	let result = ''

	for (const token of tokens) {
		switch (token.type) {
			case 'text':
				result += token.body
				break

			case 'identifier':
				result += identifier[token.body] || ''
				break

			case 'action':
				result += runPlaceholderAction(token)
				break

			default:
				break
		}
	}

	return result
}

for (const key in placeholders)
	placeholders[key] = parsePlaceholderTokens(
		tokenizePlaceholder(placeholders[key])
	)

contentContainer.innerHTML = purifier.sanitize(
	marked.parse(content.replaceAll(/\{\{(\w+)\}\}/g, (_, identifier) => {
		if (identifier in placeholders)
			return placeholders[identifier]

		return '<span class="placeholder invalid">(invalid placeholder)</span>'
	}))
)

