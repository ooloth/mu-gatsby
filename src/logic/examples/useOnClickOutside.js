function useOnClickOutside(ref, handler) {
  useEffect(() => {
    const listener = event => {
      // Do nothing if clicking ref's element or descendent elements
      if (!ref.current || ref.current.contains(event.target)) {
        return
      }

      handler(event)
    }

    document.addEventListener('mousedown', listener)
    document.addEventListener('touchstart', listener)

    return () => {
      document.removeEventListener('mousedown', listener)
      document.removeEventListener('touchstart', listener)
    }
  }, [handler, ref])
}

///////////////////////////////////////////////////////////////////////////////////

import { useEffect } from 'react'

export default useOnClickOutside

/*
 *
 * Usage
 *
 */

/*

This hook allows you to detect clicks outside of a specified element. In the example below we use it to close a modal when any element outside of the modal is clicked. By abstracting this logic out into a hook we can easily use it across all of our components that need this kind of functionality (dropdown menus, tooltips, etc).

See: https://gist.github.com/gragland/81a678775c30edfdbb224243fc0d1ec4

function App() {
  // Create a ref that we add to the element for which we want to detect outside clicks
  const ref = useRef()
  // State for our modal
  const [isModalOpen, setModalOpen] = useState(false)
  // Call hook passing in the ref and a function to call on outside click
  useOnClickOutside(ref, () => setModalOpen(false))

  return (
    <div>
      {isModalOpen ? (
        <div ref={ref}>
          👋 Hey, I'm a modal. Click anywhere outside of me to close.
        </div>
      ) : (
        <button onClick={() => setModalOpen(true)}>Open Modal</button>
      )}
    </div>
  )
}

*/
