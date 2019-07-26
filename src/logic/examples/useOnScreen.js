function useOnScreen(ref, rootMargin = '0px') {
  // State and setter for storing whether element is visible
  const [isIntersecting, setIntersecting] = useState(false)

  useEffect(() => {
    let observer
    const current = ref.current
    // if (typeof window.IntersectionObserver !== `undefined`) {
    observer = new IntersectionObserver(
      ([entry]) => {
        // Update our state when observer callback fires
        setIntersecting(entry.isIntersecting)

        // TODO: uncomment to run only once
        // if (entry.isIntersecting === true) {
        //   observer.unobserve(current)
        // }
      },
      {
        // TODO: allow separate control of top/bottom?
        rootMargin: rootMargin,
      }
    )
    if (current) {
      observer.observe(current)
    }
    return () => {
      observer.unobserve(current)
    }
    // }
  }, [ref, rootMargin]) // Empty array ensures that effect is only run on mount and unmount

  return isIntersecting
}

///////////////////////////////////////////////////////////////////////////////////

import { useState, useEffect } from 'react'

export default useOnScreen

/*
 *
 * Usage
 *
 */

/*

This hook allows you to easily detect when an element is visible on the screen as well as specify how much of the element should be visible before being considered on screen. Perfect for lazy loading images or triggering animations when the user has scrolled down to a particular section.

See: https://gist.github.com/gragland/d1175eb983772b077cb17ae0841c5329

function App() {
  // Ref for the element that we want to detect whether on screen
  const ref = useRef()
  // Call the hook passing in ref and root margin
  // In this case it would only be considered onScreen if more ...
  // ... than 300px of element is visible.
  const onScreen = useOnScreen(ref, '-300px')

  return (
    <div>
      <div style={{ height: '100vh' }}>
        <h1>Scroll down to next section 👇</h1>
      </div>
      <div
        ref={ref}
        style={{
          height: '100vh',
          backgroundColor: onScreen ? '#23cebd' : '#efefef'
        }}
      >
        {onScreen ? (
          <div>
            <h1>Hey I'm on the screen</h1>
            <img src="https://i.giphy.com/media/ASd0Ukj0y3qMM/giphy.gif" />
          </div>
        ) : (
          <h1>Scroll down 300px from the top of this section 👇</h1>
        )}
      </div>
    </div>
  )
}

*/
