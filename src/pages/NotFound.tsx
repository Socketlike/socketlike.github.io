import React from 'react'

import { BaseSite } from '@components'

export const NotFound = (): React.ReactElement => (
  <BaseSite>
    <div className='content not-found'>
      <span style={{ fontWeight: 'bold' }}>oh no! where are we?</span>
      <br />
      <div>
        don't tell me we're <span style={{ color: 'var(--red)' }}>lost</span> again...
      </div>
      <br />
      <div>
        but don't worry! i still remember <a href='/'>our way home!</a>
        <br />
        just follow me :D
      </div>
      <br />
      <div style={{ color: 'var(--gray)' }}>HTML 404: no such location "{location.pathname}"</div>
    </div>
  </BaseSite>
)
