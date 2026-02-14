const preprocessors = Object.freeze(
    [
        {
            filter: /{age}/g,
            replacer: () => {
                const age = (Date.now() / 1000 - 1171040400) / 31536000
                return `${Math.floor(age)}${age - Math.floor(age) >= .8 ? ` (almost ${Math.ceil(age)})` : ''}`
            }
        },

        { // go back, like literally go back on the path tree, not history
            filter: /{previousPath(?:\s+-([0-9])+)?}/g,
            replacer: (_, amount = 1) =>
                location.pathname
                    .split('/')
                    .slice(0, -Number(amount))
                    .join('/')
                || '/'
        },

        { // history "link" hack - part 1
            filter: /{history\s+(?:(-))?([0-9]+)}/g,
            replacer: (_, neg, amount) =>
                `/__secretevilpathnoonewoulduseonpurpose_history_${neg || ''}${amount}`
        },

        {
            filter: /{timestamp(\slong)?\s+([0-9]+)}/g,
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
            filter: /{origin}/g,
            replacer: location.origin
        },

        {
            filter: /{dialogue}/g,
            replacer: '<span blockquote-dialogue></span>'
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