import React from 'react'

import { Block } from './Block'

export const SiteContent = (props?: { children?: React.ReactNode }): React.ReactElement => (
  <Block className='site-content' label='content'>
    {props?.children}
  </Block>
)
