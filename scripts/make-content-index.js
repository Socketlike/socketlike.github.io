import { readdir, readFile, writeFile } from 'node:fs/promises'

const blacklist = await readFile('content/.indexignore', { encoding: 'utf-8' })
    .then((raw) => raw.replaceAll(/\s+$/gm, '').split('\n'))

const _default = async () => {
    return await readdir('content', { recursive: true })
        .then((dir) => dir.reduce(
            (list, file) => {
                if (!blacklist.includes(file) && file.endsWith('.md'))
                    list[file.replace('.md', '')] = file.replaceAll('\\', '/')

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