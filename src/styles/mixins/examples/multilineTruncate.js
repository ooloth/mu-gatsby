export const multilineTruncate = css`
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  visibility: visible;
  overflow: hidden;
  text-overflow: ellipsis;
`

///////////////////////////////////////////////////////////////////////////////////

import { css } from 'styled-components'

// See: http://dropshado.ws/post/1015351370/webkit-line-clamp

// See: https://stackoverflow.com/questions/38989475/css-multi-line-line-clamp-ellipsis-doesnt-work#comment94167650_53268674
