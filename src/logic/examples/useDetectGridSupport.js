function useDetectGridSupport() {
  const [browserSupportsGrid, setBrowserSupportsGrid] = useState()

  useEffect(() => {
    // Wait for the document to exist
    if (typeof window !== `undefined`) {
      // Create a test element and check for grid support
      const testEl = document.createElement(`div`)
      testEl.style.display = `grid`

      if (testEl.style.display === `grid`) setBrowserSupportsGrid(true)
      else setBrowserSupportsGrid(false)

      // return () => testEl.remove()
    }
  }, [])

  return browserSupportsGrid
}

///////////////////////////////////////////////////////////////////////////////////

import { useState, useEffect } from 'react'

export default useDetectGridSupport

/*

Detect whether the browser supports CSS grid. The hook returns a boolean value indicating whether CSS grid is supported.

USAGE:

function App() {
  const gridSupported = useDetectGridSupport()

  return (
    <p>
      Grid is supported: {gridSupported ? '😃' : '😢'}
    </p>
  )
}

*/
