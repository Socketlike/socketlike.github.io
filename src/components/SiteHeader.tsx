import React from 'react'
import { mdiMoonWaxingCrescent, mdiWhiteBalanceSunny } from '@mdi/js'
import { Icon } from '@mdi/react'

export const SiteHeader = (props: {
  theme: 'dark' | 'light'
  invertTheme: () => void
}): JSX.Element => {
  return (
    <div className='site-header'>
      <h2>Evelyn's Pages</h2>
      <div className='theme-toggle' onClick={props.invertTheme}>
        <Icon
          path={props.theme === 'dark' ? mdiWhiteBalanceSunny : mdiMoonWaxingCrescent}
          size='26px'
        />
      </div>
    </div>
  )
}
