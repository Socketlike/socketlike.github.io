const preprocessors = Object.freeze(
    [
        {
            filter: /\{age\}/g,
            replacer: () => {
                const age = (Date.now() / 1000 - 1171040400) / 31536000
                return `${Math.floor(age)}${age - Math.floor(age) >= .8 ? ` (almost ${Math.ceil(age)})` : ''}`
            }
        },

        {
            filter: /\[-time(\slong)?\s+([0-9]+)\s*\]/g,
            replacer: (_, modifier = '', timestamp) => {
                const long = new Intl.DateTimeFormat(undefined, {
                        weekday: 'long',
                        month: 'long',
                        day: 'numeric',
                        year: 'numeric',
                        hour: 'numeric',
                        minute: 'numeric'
                })
                    .format(Number(timestamp))
                
                const short = new Intl.DateTimeFormat(undefined, {
                    hour: 'numeric',
                    minute: 'numeric'
                })
                    .format(Number(timestamp))

                return `<span class="timestamp" title="${long}">${ modifier.trim() === 'long' ? long : short }</span>`
            }
        },

        {
            filter: /\[-([^\n\s]+)\s+([^\]]+)\s*\]/g,
            replacer: (_, mod, content) =>
                `<span class="${mod}">${content}</span>`
        }
    ].map(Object.freeze)
)

export default (content) =>
    preprocessors.reduce(
        (content, postprocessor) => typeof postprocessor === 'function'
            ? postprocessor(content) || content
            : content.replace(postprocessor.filter, postprocessor.replacer),
        content
    )