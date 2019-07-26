/*

A variation of dialogMachine for off-canvas menus with scroll-to-id links that

1. Saves the link href if clicking a link is what caused the menu to close
2. Waits to smooth scroll until the menu's exit animation is finished

*/

export const menuWithScrollLinksMachine = Machine(
  {
    id: 'menuWithScrollLinksMachine',
    initial: 'closed',
    context: {
      href: ``
    },
    states: {
      closed: {
        on: { OPEN: 'open' }
      },

      open: {
        entry: 'lockScrolling',
        on: {
          CLOSE: {
            target: 'closing',
            actions: 'saveHrefIfLinkClicked'
          }
        }
      },

      closing: {
        on: { CLOSE_OVERLAY: 'closed' },
        exit: ['unlockScrolling', 'scrollToIdIfHrefSaved']
      }
    }
  },
  {
    actions: {
      lockScrolling: () => disableBodyScroll(),
      saveHrefIfLinkClicked: (ctx, event) => saveHrefIfLinkClicked(ctx, event),
      unlockScrolling: () => enableBodyScroll(),
      scrollToIdIfHrefSaved: ctx => scrollToIdIfHrefSaved(ctx)
    }
  }
)

///////////////////////////////////////////////////////////////////////////////////

function saveHrefIfLinkClicked(ctx, event) {
  if (event.href && event.e) {
    event.e.preventDefault()
    ctx.href = event.href
  }
}

///////////////////////////////////////////////////////////////////////////////////

function scrollToIdIfHrefSaved(ctx) {
  if (ctx.href) {
    scrollToId(ctx.href)
    ctx.href = ``
  }
}

///////////////////////////////////////////////////////////////////////////////////

import { Machine } from 'xstate'
import { disableBodyScroll, enableBodyScroll } from 'body-scroll-lock'

import scrollToId from './scrollToId'
