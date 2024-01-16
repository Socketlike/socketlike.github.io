import React from 'react'

import { Content } from './Content'
import { Footer } from './Footer'
import { Header } from './Header'

export const Site = ({
  children,
  pathname,
}: {
  children?: React.ReactNode
  pathname: string[]
}): React.ReactElement => (
  <>
    <Header pathname={pathname} />
    <Content>{children}</Content>
    <Footer />
  </>
)

export const SiteContent = Content
export const SiteFooter = Footer
export const SiteHeader = Header
