import { createServer } from 'http-server'

import makeAssets from './make-assets.js'

await makeAssets(true)

createServer().listen(8080)
console.log('listening on 8080')