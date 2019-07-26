function useHover() {
  const [value, setValue] = useState(false)

  const ref = useRef(null)

  const handleMouseOver = () => setValue(true)
  const handleMouseOut = () => setValue(false)

  useEffect(() => {
    const node = ref.current
    if (node) {
      node.addEventListener('mouseover', handleMouseOver)
      node.addEventListener('mouseout', handleMouseOut)

      return () => {
        node.removeEventListener('mouseover', handleMouseOver)
        node.removeEventListener('mouseout', handleMouseOut)
      }
    }
  })

  return [ref, value]
}

///////////////////////////////////////////////////////////////////////////////////

import { useRef, useState, useEffect } from 'react'

export default useHover

/*
 *
 * Usage
 *
 */

/*

Detect whether the mouse is hovering an element. The hook returns a ref and a boolean value indicating whether the element with that ref is currently being hovered. So just add the returned ref to any element whose hover state you want to monitor.

See: https://gist.github.com/gragland/cfc4089e2f5d98dde5033adc44da53f8

function App() {
  const [hoverRef, isHovered] = useHover()
  return <div ref={hoverRef}>{isHovered ? '😁' : '☹️'}</div>
}

*/
