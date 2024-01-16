import React from 'react'

import { Anchor, Block } from '@components'
import { useModifiers, useSplash } from '@util'

export const Header = ({ pathname }: { pathname: string[] }): React.ReactElement => {
  const splashText = useSplash()
  const modifiers = useModifiers()

  return (
    <div className='site-header'>
      <Block className='site-name' label='header'>
        <span className='content'>evie's pages</span>{' '}
        <span className='splash-text'>
          <span className='separator'>|</span> <span className='content'>{splashText}</span>
        </span>
      </Block>
      <Block className='pages' label='pages'>
        {[
          ['home', '/'],
          ['replugged', '/replugged'],
          ['config', '/config'],
          ...(modifiers.length ? [['special', '/special']] : []),
        ].map(([name, path]) =>
          pathname[0] === path.replace('/', '') && !pathname[1] ? (
            <span className='text-bold' key={path}>
              {name}
            </span>
          ) : (
            <Anchor href={path}>{name}</Anchor>
          ),
        )}
      </Block>
    </div>
  )
}
