/*

Overview
========

A variation of limitMachine that adds category filtering.

1. Before user has clicked view all, number of visible items is based on the viewport width (and automatically updates as the viewport width changes)
2. Once the user clicks "View All", all items are shown (and the limit stops updating based on screen size)
3. When the user clicks a new category, the items are filtered by that category and the limit is reset by screen size (and resumes automatically updating on resize)

Instructions:
============

1. Set the initial context externally via withContext(); see https://github.com/davidkpiano/xstate/blob/b1d879106255b4a4067ebcccbf0c3316569bcb65/docs/guides/machines.md#initial-context
2. Name the YAML field used for filtering 'category'
3. See Steve Haid's Listing.js for an example implementation

*/

export const filterAndLimitMachine = Machine(
  {
    id: 'filterAndLimitMachine',
    context: {
      category: 'all', // update default externally
      limit: 3, // update default externally
      previousLimit: 0,
      limitsByScreen: { xl: 8, lg: 6, sm: 4, xs: 3 }, // update defaults externally
      screen: 'xs' // update default externally
    },
    initial: 'newCategory',
    states: {
      newCategory: {
        entry: 'setLimitByScreen',
        on: {
          CHANGE_CATEGORY: {
            cond: (ctx, event) => event.category !== ctx.category,
            actions: 'changeCategory'
          },
          RECALCULATE_LIMIT: { actions: 'setLimitByScreen' },
          VIEW_ALL: 'allVisible'
        }
      },

      allVisible: {
        entry: 'showAllItems',
        on: {
          CHANGE_CATEGORY: {
            target: 'newCategory',
            cond: (ctx, event) => event.category !== ctx.category,
            actions: 'changeCategory'
          },
          RECALCULATE_LIMIT: { actions: 'updateCurrentScreen' }
        }
      }
    }
  },
  {
    actions: {
      setLimitByScreen: (ctx, event) => setLimitByScreen(ctx, event),
      updateCurrentScreen: assign({ screen: (ctx, event) => event.screen }),
      changeCategory: (ctx, event) => changeCategory(ctx, event),
      showAllItems: ctx => showAllItems(ctx)
    }
  }
)

///////////////////////////////////////////////////////////////////////////////////

function setLimitByScreen(ctx, event) {
  // If triggered by resizing the viewport, update the screen value in context
  if (event.screen) ctx.screen = event.screen

  // In any case, set the limit based on the screen value now in context
  ctx.limit = ctx.limitsByScreen[ctx.screen]
}

///////////////////////////////////////////////////////////////////////////////////

export function useRecalculateLimit(state, send) {
  const sm = useMediaQuery(`(min-width: 36em)`)
  const md = useMediaQuery(`(min-width: 48em)`)
  const lg = useMediaQuery(`(min-width: 62em)`)
  const xl = useMediaQuery(`(min-width: 75em)`)

  useEffect(() => {
    let screen = `xs`
    if (sm && `sm` in state.context.limitsByScreen) screen = `sm`
    if (md && `md` in state.context.limitsByScreen) screen = `md`
    if (lg && `lg` in state.context.limitsByScreen) screen = `lg`
    if (xl && `xl` in state.context.limitsByScreen) screen = `xl`

    send(`RECALCULATE_LIMIT`, { screen: screen })
  }, [sm, md, lg, xl, state.context.limitsByScreen, send])
}

///////////////////////////////////////////////////////////////////////////////////

function changeCategory(ctx, event) {
  // To enable trailing the entire new list, set the previous limit to 0
  ctx.previousLimit = 0

  // Update the category
  ctx.category = event.category
}

///////////////////////////////////////////////////////////////////////////////////

export function filterItemsByCategory(state, items) {
  if (state.context.category === `all`) return items

  return items.filter(item => {
    if (item.category) return item.category === state.context.category
    if (item.node.category) return item.node.category === state.context.category
  })
}

///////////////////////////////////////////////////////////////////////////////////

export function limitItems(state, items) {
  return items.slice(0, state.context.limit)
}

///////////////////////////////////////////////////////////////////////////////////

function showAllItems(ctx) {
  // To enable trailing from the new item index, save the previous limit
  ctx.previousLimit = ctx.limit

  // Update the new limit to any high number
  ctx.limit = 999
}

///////////////////////////////////////////////////////////////////////////////////

import { useEffect } from 'react'
import { Machine, assign } from 'xstate'

import useMediaQuery from './useMediaQuery'
