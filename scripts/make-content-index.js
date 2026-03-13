import { readdir, readFile, writeFile, stat } from 'node:fs/promises'
import { posix } from 'node:path'
import matter from 'gray-matter'

const delisted = []

const _default = () => readdir('content', { recursive: true })
	.then(dir => dir.map(file => file.replaceAll('\\', '/')))
	.then(dir => dir.filter(file => {
		if (posix.basename(file) === '.delist')
			delisted.push(posix.dirname(file))

		return posix.extname(file) === '.md'
	}))
	.then(dir => Promise.all(
		dir.map(async file => {
			const path = posix.join('content', file)

			const birthtime = await stat(path)
				.then(({ birthtimeMs }) => birthtimeMs)
				.catch(() => -1)
			
			const content = await readFile(path, {
				encoding: 'utf-8'
			})

			return [file, birthtime, content]
		})
	))
	.then(list => list.reduce((list, [file, birthtime, content]) => {
		const key = file.slice(0, -3)

		const explicit_metadata = matter(content).data

		list[key] = {
			content_path: `/content/${file}`,
			explicit_metadata,

			path: explicit_metadata.path || key,
			title: explicit_metadata.name || key,
			delisted: explicit_metadata.delisted
				|| delisted.some(dir => dir === posix.dirname(file)),

			birthtime,
		}

		return list
	}, {}))
	.then(list => writeFile('content/index.json', JSON.stringify(list)))

if (import.meta.main)
	await _default()

export default _default