/// TODO: add variables for all the utilities I have that use a scale (but not negative size/space since I can just put a '-' in front of the positive values)

// TODO: try to move ALL media queries here, so that the only thing that media queries ever change are custom properties (cleaner code in my components, since I won't need media queries there and I can just use a single CSS variable once); (alternatively, move each component's custom properties to the top of its file?)
// See: https://www.youtube.com/watch?v=pF0pSwbZV9Y

const CustomProperties = createGlobalStyle`
  :root {
    /* Font Families */
    --bodyFont: 
     'Avenir Next',
      system-ui,
      /* macOS 10.11-10.12 */ -apple-system,
      /* Windows 6+ */ Segoe UI,
      /* Android 4+ */ Roboto,
      /* Ubuntu 10.10+ */ Ubuntu,
      /* Gnome 3+ */ Cantarell,
      /* KDE Plasma 5+ */ "Noto Sans",
      /* fallback */ sans-serif,
      /* macOS emoji */ "Apple Color Emoji",
      /* Windows emoji */ "Segoe UI Emoji",
      /* Windows emoji */ "Segoe UI Symbol",
      /* Linux emoji */ "Noto Color Emoji";;
    --headingFont: inherit;
    --codeFont: 
      /* macOS 10.10+ */ Menlo,
      /* Windows 6+ */ Consolas,
      /* Android 4+ */ "Roboto Mono",
      /* Ubuntu 10.10+ */ "Ubuntu Monospace",
      /* KDE Plasma 5+ */ "Noto Mono",
      /* KDE Plasma 4+ */ "Oxygen Mono",
      /* Linux/OpenOffice fallback */ "Liberation Mono",
      /* fallback */ monospace;

    /* Type scale (apply to local variables rather than using directly) */
    --f1: .75rem;
    --f2: .875rem;
    --f3: 1rem;
    --f4: 1.125rem;
    --f5: 1.25rem;
    --f6: 1.5rem;
    --f7: 1.875rem;
    --f8: 2.25rem;
    --f9: 3rem;
    --f10: 3.75rem;
    --f11: 4.5rem;

    /* Font Weights */
    --fw1: 400;
    --fw2: 700;

    /* Line Heights */
    --lh1: 1.2;
    --lh2: 1.5;
    --lh3: 1.7;

    /* Letter Spacings */
    --ls1: -.05em;
    --ls2: .05em;
    --ls3: .1em;
    --ls4: .25em;
 
    /* Space and Size Scale (margin, padding, width, height, border width) */
    --s1: .25rem;
    --s2: .5rem;
    --s3: .75rem;
    --s4: 1rem;
    --s5: 1.5rem;
    --s6: 2rem;
    --s7: 3rem;
    --s8: 4rem;
    --s9: 6rem;
    --s10: 8rem;
    --s11: 12rem;
    --s12: 16rem;
    --s13: 24rem;
    --s14: 32rem;
    --s15: 48rem;
    --s16: 64rem;
    --s17: 96rem;

    /* Max-widths */
    --measure1: 45ch;
    --measure2: 55ch;
    --measure3: 66ch;
    --measure4: 75ch;

    /* Border width */
    --bw0: 0;
    --bw1: .0625rem;
    --bw2: .125rem;
    --bw3: .25rem;
    --bw4: .5rem;
    --bw5: 1rem;
    --bw6: 2rem;

    /* Border radius */
    --r0: 0;
    --r1: .125rem;
    --r2: .25rem;
    --r3: .375rem;
    --r4: .5rem;
    --r5: .75rem;
    --r6: 1rem;
    --r100: 100%;

    /* Shadows */
    --shadow1: 0 1px 3px hsla(0, 0%, 0%, .2);
    --shadow2: 0 4px 6px hsla(0, 0%, 0%, .2);
    --shadow3: 0 5px 15px hsla(0, 0%, 0%, .2);
    --shadow4: 0 10px 24px hsla(0, 0%, 0%, .2);
    --shadow5: 0 15px 35px hsla(0, 0%, 0%, .2);
    --shadow6: 0 10px 50px hsla(0, 0%, 0%, 0.33);
    --inset: inset 0 2px 2px hsla(0, 0%, 0%, .1);

    /* Transitions */
    --trans1: all 0.15s ease-in-out;
    --trans2: all 0.2s ease-in-out;
    --trans3: all 0.3s ease-in-out;
    --trans4: all 0.5s ease-in-out;

    /* Cubic beziers (from https://easings.net) */
    /* TODO: delete unused values */
    --easeInSine: cubic-bezier(0.47, 0, 0.745, 0.715);
    --easeOutSine: cubic-bezier(0.39, 0.575, 0.565, 1);
    --easeInOutSine: cubic-bezier(0.445, 0.05, 0.55, 0.95);

    --easeInQuad: cubic-bezier(0.55, 0.085, 0.68, 0.53);
    --easeOutQuad: cubic-bezier(0.25, 0.46, 0.45, 0.94);
    --easeInOutQuad: cubic-bezier(0.455, 0.03, 0.515, 0.955);

    --easeInCubic: cubic-bezier(0.55, 0.055, 0.675, 0.19);
    --easeOutCubic: cubic-bezier(0.215, 0.61, 0.355, 1);
    --easeInOutCubic: cubic-bezier(0.645, 0.045, 0.355, 1);

    --easeInQuart: cubic-bezier(0.895, 0.03, 0.685, 0.22);
    --easeOutQuart: cubic-bezier(0.165, 0.84, 0.44, 1);
    --easeInOutQuart: cubic-bezier(0.77, 0, 0.175, 1);

    --easeInQuint: cubic-bezier(0.755, 0.05, 0.855, 0.06);
    --easeOutQuint: cubic-bezier(0.23, 1, 0.32, 1);
    --easeInOutQuint: cubic-bezier(0.86, 0, 0.07, 1);

    --easeInExpo: cubic-bezier(0.95, 0.05, 0.795, 0.035);
    --easeOutExpo: cubic-bezier(0.19, 1, 0.22, 1);
    --easeInOutExpo: cubic-bezier(1, 0, 0, 1);

    --easeInCirc: cubic-bezier(0.6, 0.04, 0.98, 0.335);
    --easeOutCirc: cubic-bezier(0.075, 0.82, 0.165, 1);
    --easeInOutCirc: cubic-bezier(0.785, 0.135, 0.15, 0.86);

    --easeInBack: cubic-bezier(0.6, -0.28, 0.735, 0.045);
    --easeOutBack: cubic-bezier(0.175, 0.885, 0.32, 1.275);
    --easeInOutBack: cubic-bezier(0.68, -0.55, 0.265, 1.55);
   
    /* Colors */
    /* TODO: add/move actual colours here */
    --black: hsla(0, 0%, 0%, 90%);
    --purple: hsl(267, 85%, 62%); /* Contrast with white text = 4.58 */
    --light-purple: hsla(267, 85%, 62%, 90%); /* Contrast with white text = 4.84 */

    /* Prototyping colors */
    /* TODO: remove these when the project is done */

    /* Blacks */
    --black01: hsla(0, 0%, 0%, .01);
    --black02: hsla(0, 0%, 0%, .02);
    --black05: hsla(0, 0%, 0%, .05);
    --black10: hsla(0, 0%, 0%, .1);
    --black20: hsla(0, 0%, 0%, .2);
    --black30: hsla(0, 0%, 0%, .3);
    --black40: hsla(0, 0%, 0%, .4);
    --black50: hsla(0, 0%, 0%, .5);
    --black60: hsla(0, 0%, 0%, .6);
    --black70: hsla(0, 0%, 0%, .7);
    --black80: hsla(0, 0%, 0%, .8);
    --black85: hsla(0, 0%, 0%, .85);
    --black90: hsla(0, 0%, 0%, .9);
    --black95: hsla(0, 0%, 0%, .95);

    /* Whites */
    --white01: hsla(0, 0%, 100%, .01);
    --white02: hsla(0, 0%, 100%, .02);
    --white05: hsla(0, 0%, 100%, .05);
    --white10: hsla(0, 0%, 100%, .1);
    --white20: hsla(0, 0%, 100%, .2);
    --white30: hsla(0, 0%, 100%, .3);
    --white40: hsla(0, 0%, 100%, .4);
    --white50: hsla(0, 0%, 100%, .5);
    --white60: hsla(0, 0%, 100%, .6);
    --white70: hsla(0, 0%, 100%, .7);
    --white80: hsla(0, 0%, 100%, .8);
    --white85: hsla(0, 0%, 100%, .85);
    --white90: hsla(0, 0%, 100%, .9);
    --white95: hsla(0, 0%, 100%, .95);

    /* Grays */
    --gray1: hsl(0, 0%, 97%);
    --gray2: hsl(0, 0%, 88%);
    --gray3: hsl(0, 0%, 81%);
    --gray4: hsl(0, 0%, 69%);
    --gray5: hsl(0, 0%, 62%);
    --gray6: hsl(0, 0%, 49%);
    --gray7: hsl(0, 0%, 38%);
    --gray8: hsl(0, 0%, 32%);
    --gray9: hsl(0, 0%, 23%);
    --gray10: hsl(0, 0%, 13%);

    /* Tachyons grays */
    --near-black: #111;
    --dark-gray:#333;
    --mid-gray:#555;
    --gray: #777;
    --silver: #999;
    --light-silver: #aaa;
    --moon-gray: #ccc;
    --light-gray: #eee;
    --near-white: #f4f4f4;

    /* Tachyons colors */
    --dark-red: #e7040f;
    --red: #ff4136;
    --light-red: #ff725c;
    --orange: #ff6300;
    --gold: #ffb700;
    --yellow: #ffd700;
    --light-yellow: #fbf1a9;
    ${'' /* --purple: #5e2ca5; */}
    ${'' /* --light-purple: #a463f2;  */}
    ${'' /* --light-purple: #964CF0; */}
    --dark-pink: #d5008f;
    --hot-pink: #ff41b4;
    --pink: #ff80cc;
    --light-pink: #ffa3d7;
    --dark-green: #137752;
    --green: #2eec96; /* same as UT */
    --light-green: #9eebcf;
    --navy: #001b44;
    --dark-blue: #00449e;
    --blue: #357edd;
    --light-blue: #96ccff;
    --lightest-blue: #cdecff;
  }
`

///////////////////////////////////////////////////////////////////////////////////

import { createGlobalStyle } from 'styled-components'

export default CustomProperties
