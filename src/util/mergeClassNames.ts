export const mergeClassNames = (...classNames: unknown[]): string =>
  classNames
    .map((className) => (typeof className === 'string' ? className.trim() : className))
    .filter((className) => typeof className === 'string' && className)
    .join(' ')
