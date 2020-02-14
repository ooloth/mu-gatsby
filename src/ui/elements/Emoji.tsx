import React from 'react'
import styled from 'styled-components'

const Span = styled.span`
  flex: none;
  font-family: 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol';
`

interface Props {
  emoji: string
  ariaLabel: string
}

function Emoji({ emoji, ariaLabel, ...props }: Props) {
  return (
    <Span role="img" aria-label={ariaLabel} {...props}>
      {emoji}
    </Span>
  )
}

export default Emoji
