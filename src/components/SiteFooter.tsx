import React from 'react'

import { Block } from './Block'

export const SiteFooter = (): React.ReactElement => (
  <div className='site-footer'>
    <Block className='text' label='footer'>
      <div className='content'>
        made with <span className='text-red'>love &lt;3</span> by evie
      </div>
    </Block>
    <Block className='links' label='links'>
      <div className='content'>
        <a href='https://github.com/Socketlike/socketlike.github.io'>github</a>
      </div>
    </Block>
  </div>
)
