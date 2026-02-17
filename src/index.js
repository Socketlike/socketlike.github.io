import hljs from 'https://unpkg.com/@highlightjs/cdn-assets@11.11.1/es/core.min.js'

import hljsXML from 'https://unpkg.com/@highlightjs/cdn-assets@11.11.1/es/languages/xml.min.js'
import hljsMarkdown from 'https://unpkg.com/@highlightjs/cdn-assets@11.11.1/es/languages/markdown.min.js'

import loadContent from './content.js'
import loadResponsivity from './responsivity.js'
import loadChangelog from './changelog.js'

hljs.registerLanguage('html', hljsXML)
hljs.registerLanguage('md', hljsMarkdown)

await loadResponsivity()
await loadContent().then(() => hljs.highlightAll())
await loadChangelog()