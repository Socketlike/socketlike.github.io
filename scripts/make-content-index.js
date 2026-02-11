import { readdir, readFile, writeFile } from 'node:fs/promises'
import { posix } from 'node:path'
import matter from 'gray-matter'

const delisted = [

]

const _default = async () => {
    return await readdir('content', { recursive: true })
        .then((dir) => dir.map((file) => file.replaceAll('\\', '/')))
        .then((dir) => dir.filter((file) => {
            if (posix.basename(file) === '.delist')
                delisted.push(posix.dirname(file))

            return posix.extname(file) === '.md'
        }))
        .then((dir) => Promise.all(
            dir.map(async (file) => [
                    file,
                    await readFile(
                        posix.join('content', file),
                        { encoding: 'utf-8' }
                    )
                ]
            )
        ))
        .then((list) => list.reduce(
            (list, [file, content]) => {
                const key = file.replace('.md', '')
                
                list[key] = {
                    path: '/content/' + file,
                    metadata: matter(content).data ?? {}
                }

                if (delisted.some((dir) => dir === posix.dirname(file)))
                    list[key].metadata.delisted = true

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