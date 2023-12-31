import React from 'react'

import { SiteContent } from './SiteContent'
import { SiteFooter } from './SiteFooter'
import { SiteHeader } from './SiteHeader'

export const BaseSite = (props?: { children?: React.ReactNode }): React.ReactElement => (
  <>
    <SiteHeader />
    <SiteContent>{props?.children}</SiteContent>
    <SiteFooter />
  </>
)
