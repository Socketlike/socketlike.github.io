import { readdir, readFile, writeFile, stat } from 'node:fs/promises'
import { posix as path } from 'node:path'

import shell from 'shelljs'
import matter from 'gray-matter'

const delistedFolder = []

const dir = await readdir('content', { recursive: true })

const contents = await Promise.all(
	dir
		.map(relativeFilePath => relativeFilePath.replaceAll('\\', '/'))
		.filter(relativeFilePath => {
			if (path.basename(relativeFilePath) === '.delist') {
				console.log('directory', path.dirname(relativeFilePath), 'is delisted')
				delistedFolder.push(path.dirname(relativeFilePath))
			}
			
			return path.extname(relativeFilePath) === '.md'
		})
		.map(async relativeFilePath => {
			const filePath = path.join('content', relativeFilePath)
			
			const birthtime = await stat(filePath)
			.then(({ birthtimeMs }) => birthtimeMs)
			.catch(() => null)
			
			const content = await readFile(filePath, {
				encoding: 'utf-8'
			})
			
			return { path: relativeFilePath, birthtime, content }
		})
)

const _default = () => writeFile(
	'content/index.json',
	JSON.stringify(
		{
			index: contents
				.map((data) => {
					const key = data.path.slice(0, -3)
					
					const metadata = matter(data.content).data
					
					const fileInDelistedFolder = delistedFolder.includes(path.dirname(data.path))

					console.log('indexed file', data.path)
					
					return {
						path: [
							encodeURI(path.join('/', metadata.path || key)),
							encodeURI(path.join('/content', data.path))
						],
						
						title: metadata.title || metadata.name || key,
						
						delisted: metadata.delisted || fileInDelistedFolder,

						placeholders: metadata.placeholders,
						
						birthtime: data.birthtime
					}
				})
				.toSorted(({ title: a }, { title: b }) => a.localeCompare(b)),
			
			changelog: shell
				.exec('git log --oneline --no-abbrev-commit --decorate=short -5', { silent: true })
				.stdout.trim()
		}
	)
)

export default _default

if (import.meta.main)
	await _default()