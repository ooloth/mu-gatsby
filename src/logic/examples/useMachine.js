/* eslint-disable react-hooks/exhaustive-deps */
function useMachine(machine) {
  /**
   * 1. Keep track of the current machine state
   * 2. Start the service (only once!)
   * 3. Stop the service when the component unmounts
   */

  const [current, setCurrent] = useState(machine.initialState) /* 1 */

  const service = useMemo(
    () =>
      interpret(machine)
        .onTransition(state => {
          // Update the current machine state when a transition occurs
          setCurrent(state)
        })
        .start(),
    []
  ) /* 2 */

  useEffect(() => {
    return () => service.stop()
  }, []) /* 3 */

  return [current, service.send]
}

///////////////////////////////////////////////////////////////////////////////////

import { useState, useMemo, useEffect } from 'react'
import { interpret } from 'xstate/lib/interpreter'

export default useMachine

/* 

function Toggle() {
  const [current, send] = useMachine(toggleMachine);
  return (
    <button onClick={() => send('TOGGLE')}>
      {current.matches('inactive') ? 'Off' : 'On'}
    </button>
  );
}

*/

///////////////////////////////////////////////////////////////////////////////////

/*

Interpret and use XState machines with functional components.

See: https://xstate.js.org/docs/recipes/react.html#hooks
See: https://xstate.js.org/docs/examples/todomvc.html

import { useMachine } from '../path/to/useMachine';

const toggleMachine = Machine(/* config... */
