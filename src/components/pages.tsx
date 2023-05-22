import React from 'react'
import SiteMain from './SiteMain'
import IndexBody from './index/Body'
import NotFoundBody from './notFound/Body'

const pages = {
  index: () => <SiteMain body={<IndexBody />} />,
  notFound: () => <SiteMain body={<NotFoundBody />} />,
}

const getPageIdentifier = (): keyof typeof pages => {
  const identifierMeta = document.getElementsByName('identifier')?.[0] as HTMLMetaElement

  return Object.keys(pages).includes(identifierMeta?.content)
    ? (identifierMeta.content as keyof typeof pages)
    : 'notFound'
}

export const getPage = (): JSX.Element => pages[getPageIdentifier()]()
