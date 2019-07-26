// See https://github.com/react-spring/react-spring/blob/5ac0ad2eda7c055ac54beaacf55c1be4a8b437a0/examples/demos/masonry-grid/helpers.js

function useMeasure(ref) {
  const [bounds, set] = useState({ left: 0, top: 0, width: 0, height: 0 })

  const [ro] = useState(
    () => new ResizeObserver(([entry]) => set(entry.contentRect))
  )

  useEffect(() => {
    ro.observe(ref.current)
    return () => ro.disconnect()
  }, [ref, ro])

  return bounds
}

///////////////////////////////////////////////////////////////////////////////////

import { useState, useEffect } from 'react'
import ResizeObserver from 'resize-observer-polyfill'

export default useMeasure
