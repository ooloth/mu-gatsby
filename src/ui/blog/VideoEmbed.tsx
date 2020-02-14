import React from 'react'
import styled from 'styled-components'

import {
  aspectRatioParent,
  ratio16x9,
  aspectRatioChild,
} from '../../styles/mixins/aspectRatios'

const EmbedWrapper = styled.div`
  ${aspectRatioParent}
  ${ratio16x9}
  margin-top: var(--s6);
  margin-bottom: var(--s6);
`

const Embed = styled.iframe`
  ${aspectRatioChild}
  border-radius: var(--r2);
  box-shadow: var(--shadow1);
`

interface VideoEmbed {
  embedURL: string
}

export function VideoEmbed({ embedURL, ...props }: VideoEmbed) {
  return (
    <EmbedWrapper {...props}>
      <Embed
        src={embedURL}
        allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
        frameBorder="0"
        allowFullScreen
      />
    </EmbedWrapper>
  )
}
