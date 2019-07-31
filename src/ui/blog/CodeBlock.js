export function CodeBlock({ children, className }) {
  const language = className.replace(/language-/, '')

  return (
    <Highlight
      {...defaultProps}
      code={children}
      language={language}
      theme={prismTheme}
    >
      {({ className, style, tokens, getLineProps, getTokenProps }) => (
        <Pre className={className} style={style}>
          {tokens.map((line, i) => (
            <div key={i} {...getLineProps({ line, key: i })}>
              {line.map(
                (token, key) =>
                  !token.empty && (
                    <span key={key} {...getTokenProps({ token, key })} />
                  )
              )}
            </div>
          ))}
        </Pre>
      )}
    </Highlight>
  )
}

///////////////////////////////////////////////////////////////////////////////////

const Pre = styled.pre`
  margin: var(--s4) 0;
  overflow: auto;
  border-radius: var(--r2);
  padding: var(--s3) var(--s4);
  line-height: var(--lh2);
  white-space: pre-wrap; /* Add line-wrapping */
  font-family: 'Dank Mono', Menlo, Monaco, Consolas, 'Liberation Mono',
    'Courier New', monospace, 'Apple Color Emoji', 'Segoe UI Emoji',
    'Segoe UI Symbol';
  font-size: 0.95rem;
`

///////////////////////////////////////////////////////////////////////////////////

import React from 'react'
import styled from 'styled-components'
import Highlight, { defaultProps } from 'prism-react-renderer'

import {
  container,
  copy,
  icon,
  linkInline,
  linkTag,
  main,
  media,
  pageHeadline,
  pageSubheadline,
  pageSummary,
  prismTheme,
  project,
  projectDescription,
  projectTitle,
  purpleUnderline,
  tagList,
  tagItem
} from '../../styles'
