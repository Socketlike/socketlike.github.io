import React from 'react'
import { TooltippedText } from '@components'

export const Body = (): JSX.Element => (
  <div className='not-found-body'>
    <h2 className='not-found-header'>Hold on...</h2>
    <span className='not-found-text'>
      <TooltippedText tooltip='You have attempted to request non-existent data.'>
        Something feels wrong.
      </TooltippedText>
      <br />
      <span>Double check to see if the URL you entered is valid.</span>
    </span>
  </div>
)
