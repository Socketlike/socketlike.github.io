import React from 'react'
import { TooltippedText } from '@components/TooltippedText'

export const Body = (): JSX.Element => (
  <div className='index-body'>
    <span>
      Hi! I'm <TooltippedText tooltip='Other aliases: Socketlike, EvelynXII'>Evelyn</TooltippedText>
      .
      <br />
      I'm a very boring and confusing person who enjoys{' '}
      <TooltippedText tooltip='I make things using TypeScript (sometimes JavaScript) and C++'>
        programming
      </TooltippedText>
      .
      <br />
      <br />
      Welcome to my GitHub Pages!
      <br />
      There is mostly nothing here yet, as it is used for literally{' '}
      <TooltippedText tooltip='This GitHub pages is used for hosting an unofficial Replugged manifest.json schema'>
        almost
      </TooltippedText>{' '}
      nothing 😓
    </span>
  </div>
)
