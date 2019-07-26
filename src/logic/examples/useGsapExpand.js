function useGsapExpand(duration, config, onMount = false) {
  const ref = useRef()

  useEffect(() => {
    if (onMount) expand()
  }, [ref, onMount, expand])

  const expand = useCallback(() => {
    loadjs.ready(`gsap`, () => TweenMax.to(ref.current, duration, config))
  }, [config, duration])

  return [ref, expand]
}

///////////////////////////////////////////////////////////////////////////////////

import { useRef, useEffect, useCallback } from 'react'
// import { TweenMax } from 'gsap'
import loadjs from 'loadjs'

export default useGsapExpand

///////////////////////////////////////////////////////////////////////////////////

/*

function Demo() {
  let [tweenRef] = useGsapExpand(5, { x: 100, rotationZ: 360 }, true);
  let [tween2Ref, expand] = useGsapExpand(1, { x: "+=10", rotationZ: "+=30" });

  return (
    <div>
      <div
        ref={tweenRef}
        style={{ width: 100, height: 100, backgroundColor: "green" }}
      />
      <div
        ref={tween2Ref}
        onClick={() => expand()}
        style={{ width: 100, height: 100, backgroundColor: "green" }}
      />
      <button onClick={() => expand()}>Expand</button>
    </div>
  );
}

*/
