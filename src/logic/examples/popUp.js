/*

A variation of dialogMachine for automatic pop-ups that

1. Only appear if they haven't appeared recently (e.g. not already today)
2. Wait to appear until a given timeout elapses (e.g. 10 seconds)

*/

export const popUpMachine = Machine(
  {
    id: 'popUpMachine',
    initial: 'closed',
    states: {
      closed: {
        on: {
          OPEN: {
            target: 'timer',
            cond: ctx => wasNotAlreadyShownToday(ctx)
          }
        }
      },

      timer: {
        after: {
          10000: 'open' // after 10 seconds, transition to open
        }
      },

      open: {
        entry: ['lockScrolling', 'setDateLastOpenedToToday'],
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
      setDateLastOpenedToToday: ctx => setDateLastOpenedToToday(ctx),
      lockScrolling: () => disableBodyScroll(),
      unlockScrolling: () => enableBodyScroll()
    }
  },
  {
    dateLastOpened: getDateLastOpenedFromLocalStorage()
  }
)

///////////////////////////////////////////////////////////////////////////////////

function getDateLastOpenedFromLocalStorage() {
  if (typeof window !== `undefined`) {
    return JSON.parse(window.localStorage.getItem('dateLastOpened'))
  }
}

///////////////////////////////////////////////////////////////////////////////////

function wasNotAlreadyShownToday(ctx) {
  if (ctx.dateLastOpened) {
    const today = new Date().toString().substring(0, 15)
    return ctx.dateLastOpened < today
  }

  return true
}

///////////////////////////////////////////////////////////////////////////////////

function setDateLastOpenedToToday(ctx) {
  const today = new Date().toString().substring(0, 15)
  ctx.dateLastOpened = today

  if (typeof window !== `undefined`) {
    window.localStorage.setItem('dateLastOpened', JSON.stringify(today))
  }
}

///////////////////////////////////////////////////////////////////////////////////

import { Machine } from 'xstate'
import { disableBodyScroll, enableBodyScroll } from 'body-scroll-lock'
