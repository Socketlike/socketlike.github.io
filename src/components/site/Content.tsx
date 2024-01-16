import React from 'react'

import { Block } from '@components/pure'

export const Content = (props?: { children?: React.ReactNode }): React.ReactElement => (
  <Block className='site-content' label='content'>
    {props?.children}
  </Block>
)
