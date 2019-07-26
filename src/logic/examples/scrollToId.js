function scrollToId(id) {
  // Locate the element by its ID
  const hashIndex = id.indexOf(`#`) || 0
  const idWithNoHash = id.substring(hashIndex + 1)
  const el = document.getElementById(idWithNoHash)

  // Calculate the element's scroll position and scroll to it
  const domRect = el.getBoundingClientRect()
  animateScroll.scrollMore(domRect.top, {
    duration: 1500,
    smooth: 'easeInOutQuint',
  })
}

///////////////////////////////////////////////////////////////////////////////////

import { animateScroll } from 'react-scroll'

export default scrollToId

///////////////////////////////////////////////////////////////////////////////////

/* 

Usage:

<Link href="#section" onClick={() => scrollToId(`#section`)} >

*/
