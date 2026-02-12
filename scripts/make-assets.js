import process from 'node:process'

import make404 from './make-404.js'
import makeContentIndex from './make-content-index.js'
import makeChangelog from './make-changelog.js'

const _default = async (log = false) => {
    process.stdout.write('cloning index.html -> 404.html;')
    await make404()
    process.stdout.write(' done\n')

    process.stdout.write('making content index;')
    await makeContentIndex()
    process.stdout.write(' done\n')

    process.stdout.write('making changelog;')
    await makeChangelog()
    process.stdout.write(' done\n')
}

if (import.meta.main)
    await _default(true)

export default _default