function useWindowSize() {
  const isClient = typeof window === 'object'
  const [windowSize, setWindowSize] = useState(getSize)

  const getSize = useCallback(() => {
    return {
      width: isClient ? window.innerWidth : undefined,
      height: isClient ? window.innerHeight : undefined,
    }
  }, [isClient])

  const handleResize = useCallback(() => {
    setWindowSize(getSize())
  }, [getSize])

  useEffect(() => {
    if (!isClient) {
      return false
    }

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [getSize, handleResize, isClient])

  return windowSize
}

///////////////////////////////////////////////////////////////////////////////////

import { useState, useEffect, useCallback } from 'react'

export default useWindowSize

///////////////////////////////////////////////////////////////////////////////////

/*

A really common need is to get the current size of the browser window. This hook returns an object containing the window's width and height. If executed server-side (no window object) the value of width and height will be undefined.

See: https://gist.github.com/gragland/4e3d9b1c934a18dc76f585350f97e321

function App() {
  const size = useWindowSize()

  return (
    <div>
      {size.width}px / {size.height}px
    </div>
  )
}

*/
