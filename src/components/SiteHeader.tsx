import React from 'react'

import { useInterval } from '@util'

import { Block } from './Block'

export const splashText = [
  "everything went wrong and i don't know why",
  "i hope you're not just refreshing the page to see all of the splash text because that's silly - there's a smarter way",
  "i'm horrid at literature",
  "i'm not good at designing websites",
  "i'm tired",
  "you're welcome!",
  '"i envy other people\'s art" ~ my sister',
  'also check out "DYSMANTLE"',
  'also check out "Flashcord", (whatever that is?)',
  'also check out "Serial Experiments Lain"',
  'also check out "Slay the Spire"',
  'also check out "Steins;Gate" and "Steins;Gate 0"',
  'can someone please tell me which RPG game i should play next',
  'did you know that i spend most of my time doing absolutely nothing',
  'did you know this text changes every hour you stay on this page?',
  'every day is the same',
  'everybody is silly',
  'everything is (not) going to plan',
  'everything this website consists of is exposed on window',
  'i am silly',
  'i hate chemistry',
  'i have a penguin plushie and i treat it like my child',
  'i love (some) dogs!',
  'i love cats!',
  'i love pretty skies! (and clouds)',
  'i love sci-fi',
  'i play Minecraft, too!',
  'i ran out of things to write about',
  'i wish i could draw',
  'my favorite song right now is "Forgotten" by Ollie. what about you?',
  'oh yeah i also have anger issues',
  'sleepy',
  'what am i even doing',
  'where did my time go',
  'you are silly',
]

export const useSplashText = (): string => {
  const [currentSplashTextEntry, setCurrentSplashTextEntry] = React.useState(
    Math.round(Math.random() * (splashText.length - 1)),
  )
  const currentSplashText = React.useMemo(
    () => splashText[currentSplashTextEntry],
    [currentSplashTextEntry],
  )

  useInterval(() => setCurrentSplashTextEntry(Math.random() * (splashText.length - 1)), 3600 * 1000)

  return currentSplashText
}

export const SiteHeader = (): React.ReactElement => {
  const currentSplashText = useSplashText()

  return (
    <div className='header'>
      <Block className='site-name' label='header'>
        <span className='content'>evie's pages</span>{' '}
        <span className='splash-text'>
          <span className='separator'>|</span> <span className='content'>{currentSplashText}</span>
        </span>
      </Block>
      <Block className='pages' label='pages'>
        {[
          { path: '/', name: 'home' },
          { path: '/replugged', name: 'replugged' },
          { path: '/config', name: 'config' },
        ].map(({ path, name }) =>
          location.pathname === path ? (
            <span style={{ fontWeight: 'bold' }} key={path}>
              {name}
            </span>
          ) : (
            <a href={path} key={path}>
              {name}
            </a>
          ),
        )}
      </Block>
    </div>
  )
}
