function useTweenMaxTo(duration, config, onMount = false) {
  const ref = useRef()

  useEffect(() => {
    if (onMount) animate()
  }, [ref, onMount, animate])

  const animate = useCallback(() => {
    loadjs.ready(`gsap`, () => TweenMax.to(ref.current, duration, config))
  }, [config, duration])

  return [ref, animate]
}

///////////////////////////////////////////////////////////////////////////////////

import { useRef, useEffect, useCallback } from 'react'
// import { TweenMax } from 'gsap'
import loadjs from 'loadjs'

export default useTweenMaxTo

///////////////////////////////////////////////////////////////////////////////////

/*

function Demo() {
  let [tweenRef] = useTweenMaxTo(5, { x: 100, rotationZ: 360 }, true);
  let [tween2Ref, go] = useTweenMaxTo(1, { x: "+=10", rotationZ: "+=30" });

  return (
    <div>
      <div
        ref={tweenRef}
        style={{ width: 100, height: 100, backgroundColor: "green" }}
      />
      <div
        ref={tween2Ref}
        onClick={() => go()}
        style={{ width: 100, height: 100, backgroundColor: "green" }}
      />
      <button onClick={() => go()}>Go</button>
    </div>
  );
}

*/
