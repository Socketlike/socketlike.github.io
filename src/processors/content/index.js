import { Marked } from 'https://unpkg.com/marked@17.0.1/lib/marked.esm.js'
import DOMPurify from 'https://unpkg.com/dompurify@3.3.1/dist/purify.es.mjs'

import replacePlaceholders from './placeholders.js'
import postprocess from './postprocessor.js'

const marked = new Marked()

export default content => postprocess(
	DOMPurify.sanitize(
		marked.parse(replacePlaceholders(content)),
		{ ADD_ATTR: ['_special'] }
	)
)
