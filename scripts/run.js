import { createServer } from 'http-server'

import make404 from './make-404.js'
import makeContentIndex from './make-content-index.js'
import makeChangelog from './make-changelog.js'

await make404()
await makeContentIndex()
await makeChangelog()
createServer().listen(8080)