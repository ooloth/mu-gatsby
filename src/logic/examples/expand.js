// Basic state chart for user-toggled accordions

export const expandMachine = Machine({
  id: 'expandMachine',
  initial: 'collapsed',
  states: {
    collapsed: {
      on: { TOGGLE: 'expanded' },
    },

    expanded: {
      on: { TOGGLE: 'collapsed' },
    },
  },
})

///////////////////////////////////////////////////////////////////////////////////

import { Machine } from 'xstate'
