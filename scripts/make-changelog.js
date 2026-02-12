import shell from 'shelljs'
import { writeFile } from 'node:fs/promises'

const _default = () => writeFile(
    'content/changelog.json',
    JSON.stringify(
        shell.exec('git log --oneline -5', { silent: true }).stdout
            .trim()
            .split('\n')
            .map((log) => [log.substring(0, 7), log.substring(8)])
    )
)

if (import.meta.main)
    await _default()

export default _default