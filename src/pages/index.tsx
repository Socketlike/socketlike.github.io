import React from 'react'
import normalize from 'path-normalize'

import { Site } from '@components'
import { globalEvents } from '@util'

import { Config } from './Config'
import { Main } from './Main'
import { NotFound } from './NotFound'
import { Replugged } from './Replugged'
import { Special } from './Special'

export const index = [Main, Replugged, Config, Special, NotFound]

export const PageWrapper = (): React.ReactElement => {
  const [pathname, setPathname] = React.useState(
    normalize(location.pathname).replace('/', '').split('/'),
  )

  const [page, setPage] = React.useState(index.find(({ match }) => match(pathname)) || NotFound)

  React.useEffect(
    () =>
      globalEvents.on('pageUpdate', () => {
        const pathname = normalize(location.pathname).replace('/', '').split('/')

        setPathname(pathname)

        setPage(index.find(({ match }) => match(pathname)) || NotFound)
      }),
    [],
  )

  return (
    <Site pathname={pathname}>
      <page.Page pathname={pathname} />
    </Site>
  )
}
