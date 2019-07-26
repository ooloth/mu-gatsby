// Basic state chart for user toggled dialogs

export const dialogMachine = Machine(
  {
    id: 'dialogMachine',
    initial: 'closed',
    states: {
      closed: {
        on: { OPEN: 'open' }
      },

      open: {
        entry: 'lockScrolling',
        on: { CLOSE: 'closing' }
      },

      closing: {
        on: { CLOSE_OVERLAY: 'closed' },
        exit: 'unlockScrolling'
      }
    }
  },
  {
    actions: {
      lockScrolling: () => disableBodyScroll(),
      unlockScrolling: () => enableBodyScroll()
    }
  }
)

///////////////////////////////////////////////////////////////////////////////////

import { Machine } from 'xstate'
import { disableBodyScroll, enableBodyScroll } from 'body-scroll-lock'
