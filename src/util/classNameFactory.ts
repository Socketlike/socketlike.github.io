export default (...classNames: unknown[]): string =>
  classNames
    .filter((className): className is string => typeof className === 'string')
    .flatMap((className: string) => className.split(' ').map((className) => Boolean(className)))
    .join(' ')
