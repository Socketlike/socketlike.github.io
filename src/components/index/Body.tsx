import React from 'react'
import TooltippedText from '../TooltippedText'

export default () => (
  <div className='index-body'>
    <span>
      Hi! I'm{' '}
      <TooltippedText tooltip='Other aliases: Socketlike, EvelynXII'>
        <span className='block'>Evelyn</span>
      </TooltippedText>
      .
      <br />
      I'm a very typical and shy person who loves watching over mundane human activities and{' '}
      <TooltippedText tooltip='I make things using TypeScript (sometimes JavaScript) and C++'>
        <span className='block'>programming</span>
      </TooltippedText>
      .
      <br />
      <br />
      Welcome to my humble GitHub Pages!
      <br />
      There is mostly nothing here yet, as it is used for{' '}
      <TooltippedText
        tooltip="This GitHub Pages is used for: SpotifyModal preview GIF, a modified version of Sublime
            Text's Discord RPC plugin">
        <span className='block'>almost</span>
      </TooltippedText>{' '}
      nothing 😓
    </span>
  </div>
)
