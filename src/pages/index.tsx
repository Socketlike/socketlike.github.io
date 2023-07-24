import React from 'react'
import { render as render404 } from './404'
import { render as renderIndex } from './main'
import { render as renderReplugged } from './replugged'

const pages = {
  notFound: render404,
  index: renderIndex,
  replugged: renderReplugged,
}

export const render = (
  identifier = (document.getElementById('identifier') as HTMLMetaElement).content || 'notFound',
): JSX.Element => {
  return pages[identifier]?.() || <div />
}
