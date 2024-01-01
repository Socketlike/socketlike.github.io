import React from 'react'

import { BaseSite } from '@components'

export const NotFound = (): React.ReactElement => (
  <BaseSite>
    <div className='content not-found'>
      <div className='text-bold text-large'>oh no! where are we?</div>
      <br />
      <div>
        don't tell me we're <span className='text-red'>lost</span> again...
        <br />
        <br />
        but don't worry! i still remember <a href='/'>our way home!</a>
        <br />
        just follow me :D
      </div>
      <br />
      <div className='text-gray'>HTML 404: no such location "{location.pathname}"</div>
    </div>
  </BaseSite>
)
