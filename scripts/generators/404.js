import { copyFile, unlink, access, constants } from 'node:fs/promises'

const _default = () => access('./404.html', constants.F_OK)
	.then(() => unlink('./404.html'))
	.catch(() => {})
	.finally(() => copyFile('./index.html', './404.html'))

export default _default

if (import.meta.main)
	await _default()