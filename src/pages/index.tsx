import React from 'react'

import { Config } from './Config'
import { Main } from './Main'
import { NotFound } from './NotFound'
import { Replugged } from './Replugged'

export const pages = {
  config: Config,
  main: Main,
  notFound: NotFound,
  replugged: Replugged,
}

export const Page = () =>
  pages[
    (document.getElementById('identifier') as HTMLMetaElement).content as keyof typeof pages
  ]?.() || <NotFound />
