import React from 'react'

import normalize from 'path-normalize'

import { Config } from './Config'
import { Main } from './Main'
import { NotFound } from './NotFound'
import { Replugged } from './Replugged'

export const index = [Main, Replugged, Config, NotFound]

export const PageWrapper = (): React.ReactElement => {
  const [pathname] = React.useState(
    normalize(location.pathname)
      .replace('/', '')
      .split('/')
      .filter((pathname) => Boolean(pathname)),
  )
  const [page] = React.useState(index.find(({ match }) => match(pathname)) || NotFound)

  return <page.Page pathname={pathname} />
}
