import { useState, useMemo, useEffect } from 'react'
import { interpret } from 'xstate/lib/interpreter'

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
    [],
  ) /* 2 */

  useEffect(() => {
    return () => service.stop()
  }, []) /* 3 */

  return [current, service.send]
}

export default useMachine
