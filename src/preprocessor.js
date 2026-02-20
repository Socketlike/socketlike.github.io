const preprocessors = Object.freeze(
    [
        {
            filter: /{origin}/g,
            replacer: location.origin
        },
    ].map(Object.freeze)
)

export default (content) =>
    preprocessors.reduce(
        (content, postprocessor) => typeof postprocessor === 'function'
            ? postprocessor(content) || content
            : content.replace(postprocessor.filter, postprocessor.replacer),
        content
    )