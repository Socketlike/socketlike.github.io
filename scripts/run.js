import { createServer } from 'http-server'
import all from './generators/all.js'

await all()

createServer().listen(8080)