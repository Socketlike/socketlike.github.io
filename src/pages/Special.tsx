import React from 'react'

import { Anchor } from '@components'
import { useModifiers } from '@util'

import { NotFound } from './NotFound'

export const SpecialBirthday = (): React.ReactElement => (
  <div className='content'>
    wow! it's my birthday again.
    <br />
    <br />
    to be completely honest, i'm not very excited about my birthday;
    <br />
    mostly because no one celebrates it?
    <br />
    <br />
    and because of that, my birthday is just like every normal day to me;
    <br />
    <br />
    - i wake up,
    <br />
    - eat breakfast,
    <br />
    - go to school,
    <br />
    - go home,
    <br />
    - eat lunch,
    <br />
    - maybe go back to school,
    <br />
    - go home again,
    <br />
    - zone out,
    <br />
    - then sleep.
    <br />
    <br />
    if you feel bad for me, don't.
    <br />
    if you feel like celebrating my birthday, then maybe reach into my Discord DMs and say "happy
    birthday".
    <br />
    otherwise, there's nothing left for you here.
    <br />
  </div>
)

export const SpecialHoliday = (): React.ReactElement => (
  <div className='content'>
    holidays are silly.
    <br />
    <br />
    sometimes they are just used as an excuse to procrastinate.
    <br />
    sometimes they are just used as an excuse to do something fun.
    <br />
    sometimes they are just used as an excuse to meet up with friends.
    <br />
    sometimes they are just used as an excuse to celebrate something.
    <br />
    <br />
    for me they are just another day off from school.
    <br />
    holidays aren't very fun when you don't have anyone to celebrate it with.
  </div>
)

export const Special = {
  match: (pathname: string[]) => pathname[0] === 'special',
  Page: ({ pathname }: { pathname: string[] }): React.ReactElement => {
    const modifiers = useModifiers()

    if (modifiers.includes('birthday') && pathname[1] === 'birthday') return <SpecialBirthday />

    if (
      (modifiers.includes('christmas') ||
        modifiers.includes('halloween') ||
        modifiers.includes('newYear')) &&
      pathname[1] === 'holiday'
    )
      return <SpecialHoliday />

    if (modifiers.length && !pathname[1])
      return (
        <div className='content'>
          these modifiers are active now:
          <br />
          <br />
          <div style={{ display: 'flex', gap: '6px' }}>
            {modifiers.includes('birthday') && <Anchor href='/special/birthday'>birthday</Anchor>}
            {(modifiers.includes('christmas') ||
              modifiers.includes('halloween') ||
              modifiers.includes('newYear')) && <Anchor href='/special/holiday'>holiday</Anchor>}
          </div>
        </div>
      )

    return <NotFound.Page pathname={pathname} />
  },
}
