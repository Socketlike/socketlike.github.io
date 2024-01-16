import React from 'react'

import { Anchor } from '@components'

export const NotFound: Page = {
  match: () => true,
  Page: (props: { pathname: string[] }): React.ReactElement => (
    <div className='content not-found'>
      <div className='text-bold text-large'>oh no! where are we?</div>
      <br />
      <div>
        don't tell me we're <span className='text-red'>lost</span> again...
        <br />
        <br />
        but don't worry! i still remember <Anchor href='/'>our way home!</Anchor>
        <br />
        just follow me :D
      </div>
      <br />
      <div className='text-gray'>
        HTML 404: no such location "{`/${props?.pathname?.join('/')}`}"
      </div>
    </div>
  ),
}
