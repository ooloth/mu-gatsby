/*

A variation of expandMachine for "read more" sections that:

1. Auto-expand on large screens, and 
2. Never return to the collapsed state after reaching the expanded state

*/

export const readMoreMachine = Machine({
  id: 'readMoreMachine',
  initial: 'collapsed',
  states: {
    collapsed: {
      on: { EXPAND: 'expanded' },
    },

    expanded: {},
  },
})

///////////////////////////////////////////////////////////////////////////////////

export function useExpandOnLargeScreens(send) {
  const mdScreen = useMediaQuery(`(min-width: 48em)`)

  useEffect(() => {
    if (mdScreen) {
      send('EXPAND')
    }
  }, [mdScreen, send])
}

///////////////////////////////////////////////////////////////////////////////////

import { useEffect } from 'react'
import { Machine } from 'xstate'

import useMediaQuery from './useMediaQuery'
