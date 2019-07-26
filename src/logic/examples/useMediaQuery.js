function useMediaQuery(query, defaultMatches) {
  const [matches, setMatches] = useState(defaultMatches)

  useEffect(() => {
    if (typeof window !== `undefined`) {
      let mounted = true
      const mediaQuery = window.matchMedia(query)

      const onChange = () => {
        if (!mounted) return
        setMatches(!!mediaQuery.matches)
      }

      mediaQuery.addListener(onChange)
      setMatches(mediaQuery.matches)

      return () => {
        mounted = false
        mediaQuery.removeListener(onChange)
      }
    }
  }, [query])

  return matches
}

///////////////////////////////////////////////////////////////////////////////////

import { useState, useEffect } from 'react'

export default useMediaQuery

/*

Use CSS media queries in JS. The hook returns a boolean value indicating whether the CSS grid currently matches which automatically updates when the browser is resized.

See: https://github.com/streamich/use-media/blob/master/src/index.ts

USAGE:

function Items({ items }) {
  const gridSupported = useDetectGridSupport()
  const mdScreen = useMediaQuery(`(min-width: 48em)`)
  const xlScreen = useMediaQuery(`(min-width: 75em)`)

  const [limit, setLimit] = useState(() => setLimitByBreakpoint())

  function calculateLimit() {
    if (limit === 999) return 999 // If user has clicked show all, set to 999
    return setLimitByBreakpoint() // Otherwise, calculate by breakpoint
  }

  function setLimitByBreakpoint() {
    let limitByScreen = 3
    if (gridSupported) {
      if (mdScreen) limitByScreen = 4
      if (xlScreen) limitByScreen = 9
    }
    return limitByScreen
  }

  useEffect(() => setLimit(calculateLimit), [
    limit,
    gridSupported,
    mdScreen,
    xlScreen
  ])

  // Computed properties
  const visibleItems = items.slice(0, limit)
  const limited = visibleItems < items

  return (
    <>
      <ul>
        {visibleItems.map(article => (
          <Item key={item.node.title} item={item.node} />
        ))}
      </ul>

      <button
        onClick={() => setLimit(999)}
        aria-expanded={false}
      >
        See all items
      </button>
    </>
  )
}

*/
