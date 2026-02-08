import { createServer } from 'http-server'
import makeContentIndex from './make-content-index.js'

await makeContentIndex()
createServer().listen(8080)