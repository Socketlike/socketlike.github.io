import React from 'react'

import { Config } from './Config'
import { Main } from './Main'
import { NotFound } from './NotFound'
import { Replugged } from './Replugged'

export const index = [Main, Replugged, Config, NotFound]

export const PageWrapper = (): React.ReactElement => {
  const [pathname] = React.useState(
    new URL(location.href).pathname.split('/').filter((pathname) => Boolean(pathname)),
  )
  const [page] = React.useState(index.find(({ match }) => match(pathname)) || NotFound)

  return <page.Page pathname={pathname} />
}
