// Basic state chart to use with react-image-lightbox

export const lightboxMachine = Machine(
  {
    id: 'lightboxMachine',
    initial: 'closed',
    context: {
      currentIndex: null,
      nextIndex: null,
      prevIndex: null,
      imageCount: null // update this value externally
    },
    states: {
      closed: {
        entry: 'unlockScrolling',
        on: {
          OPEN: {
            target: 'open',
            actions: 'setLightboxIndeces'
          }
        },
        exit: 'lockScrolling'
      },

      open: {
        entry: 'setLightboxIndeces',
        on: {
          SET_INDEX: 'open',
          CLOSE: 'closed'
        }
      }
    }
  },
  {
    actions: {
      setLightboxIndeces: (ctx, event) => setLightboxIndeces(ctx, event),
      lockScrolling: () => disableBodyScroll(),
      unlockScrolling: () => enableBodyScroll()
    }
  }
)

///////////////////////////////////////////////////////////////////////////////////

function setLightboxIndeces(ctx, event) {
  ctx.currentIndex = event.index
  ctx.nextIndex = (ctx.currentIndex + 1) % ctx.imageCount
  ctx.prevIndex = (ctx.currentIndex + ctx.imageCount - 1) % ctx.imageCount
}

///////////////////////////////////////////////////////////////////////////////////

import { Machine } from 'xstate'
import { disableBodyScroll, enableBodyScroll } from 'body-scroll-lock'
