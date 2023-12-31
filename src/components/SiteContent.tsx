import React from 'react'

import { Block } from './Block'

export const SiteContent = (props?: { children?: React.ReactNode }): React.ReactElement => (
  <Block className='main-content' label='main content'>
    {props?.children}
  </Block>
)
