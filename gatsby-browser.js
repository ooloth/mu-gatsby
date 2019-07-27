export const onInitialClientRender = () => {
  // A11Y: Detect keyboard vs. mouse vs. touch input (for focus styling)
  if (!loadjs.isDefined(`what-input`)) {
    loadjs(`https://unpkg.com/what-input@5.1.3/dist/what-input.js`, `what-input`)
  }
}

///////////////////////////////////////////////////////////////////////////////////

import loadjs from 'loadjs'
