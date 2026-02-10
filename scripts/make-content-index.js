import { readdir, readFile, writeFile } from 'node:fs/promises'
import matter from 'gray-matter'

const _default = async () => {
    return await readdir('content', { recursive: true })
        .then((dir) => dir.filter((file) => file.endsWith('.md')))
        .then((dir) => Promise.all(
            dir.map(async (file) => [
                    file.replaceAll('\\', '/'),
                    await readFile(
                        'content/' + file.replaceAll('\\', '/'),
                        { encoding: 'utf-8' }
                    )
                ]
            )
        ))
        .then((list) => list.reduce(
            (list, [file, content]) => {
                list[file.replace('.md', '')] = {
                    path: '/content/' + file,
                    metadata: matter(content).data
                }

                return list
            },
            {}
        ))
        .then((list) => writeFile('content/index.json', JSON.stringify(list)))
}

if (import.meta.main) {
    _default()
}

export default _default