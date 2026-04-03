import generate_404 from './404.js'
import generate_index from './index.js'

const _default = () => Promise.allSettled([
	generate_index(),
	generate_404()
])

export default _default

if (import.meta.main)
	await _default()