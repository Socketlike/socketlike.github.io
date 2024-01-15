import React from 'react'

import { BaseSite } from '@components'

export const Main: Page = {
  match: (pathname) => !pathname[0],
  Page: (): React.ReactElement => (
    <BaseSite>
      <div className='content'>
        hi! i'm evie! (or evelyn)
        <br />
        <br />
        i'm someone that you don't know yet (maybe it's for the best?)
        <br />
        i also make things in JavaScript! (or TypeScript, if you may)
        <br />
        <br />
        welcome to my GitHub pages!
        <br />
        <br />
        i'm also on discord if you want to reach me!
        <br />
        my username is <code>encyclopedic</code>.
      </div>
    </BaseSite>
  ),
}
