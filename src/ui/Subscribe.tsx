import React, { SyntheticEvent } from 'react'
import { useMachine } from '@xstate/react'
import styled from 'styled-components'

import { Emoji } from './elements'
import { netlifyFormMachine } from '../logic/netlifyForm'
import { copy, purpleGradient } from '../styles'

const emailRegex = `.+@.+..+`

const InputAndSubmit = styled.div`
  @media screen and (min-width: 480px) {
    ${purpleGradient}
    display: flex;
    align-items: baseline;
    margin-top: var(--s4);
    box-shadow: var(--shadow1);
    border-radius: var(--r2);
    overflow: hidden;
    width: max-content;
    max-width: 100%;
  }
`

const Input = styled.input`
  ${purpleGradient}
  display: block;
  margin-top: var(--s4);
  box-shadow: var(--shadow1);
  border-radius: var(--r2);
  padding: var(--s2) var(--s3);
  width: 100%;
  line-height: normal;
  text-align: center;
  color: white;

  &::placeholder {
    opacity: 0.9;
    color: white;
  }

  @media screen and (min-width: 480px) {
    flex: 1 1 auto;
    margin-top: 0;
    box-shadow: none;
    border-radius: 0;
    background: transparent;
    width: 18rem;
    text-align: left;
  }
`

const Submit = styled.button`
  margin-top: var(--s1);
  box-shadow: var(--shadow1);
  border: none;
  border-radius: var(--r2);
  background-color: white;
  background-color: var(--black);
  padding: var(--s2) var(--s3);
  width: 100%;
  line-height: normal;
  color: var(--black);
  color: white;
  font-size: 0.9rem;
  font-weight: 700;
  letter-spacing: 0.04em;
  text-transform: uppercase;

  &:hover {
    background-color: transparent;
    color: white;
  }

  @media screen and (min-width: 480px) {
    flex: none;
    margin-top: 0;
    box-shadow: none;
    border-radius: 0;
    width: auto;
    line-height: 1.6;
  }
`

const AlertText = styled.p`
  display: block;
  margin-top: var(--s2);
  line-height: 2.4;
`

function NetlifyForm() {
  const [state, send] = useMachine(netlifyFormMachine)

  function handleChange(event: SyntheticEvent) {
    const button = event.target as HTMLButtonElement
    send('UPDATE_FIELD', { name: 'email', value: button.value })
  }

  function handleSubmit(event: SyntheticEvent) {
    event.preventDefault()
    send('SUBMIT')
  }

  return (
    <>
      {state.value !== `success` && (
        <>
          <Text>Receive my latest content by email.</Text>
          <small>No spam. No email sharing. Unsubscribe any time.</small>

          <form data-netlify="true" name="Subscribe" onSubmit={handleSubmit}>
            {/* Hidden fields required by Netlify */}
            <input type="hidden" name="form-name" value="Subscribe" />
            <input type="hidden" name="email" />

            <InputAndSubmit>
              <Input
                id="email"
                name="email"
                type="email"
                aria-label="Email address"
                placeholder="Email address"
                onChange={handleChange}
                title={`The portion of the email address after the @ is invalid.`}
                pattern={emailRegex}
                required
              />
              <Submit type="submit">Sign Up</Submit>
            </InputAndSubmit>
          </form>
        </>
      )}

      {state.value === `error` && (
        <AlertText>
          Oops! Please make sure you've entered a valid email address.
        </AlertText>
      )}

      {state.value === `success` && (
        <AlertText>
          Thanks for subscribing!{' '}
          <Emoji
            emoji="🙌"
            ariaLabel="An emoji of two hands raised in appreciation."
          />
          <br />
          You'll be the first to know when I publish new content.
        </AlertText>
      )}
    </>
  )
}

const Section = styled.section`
  padding-top: var(--s8);
`

const Heading = styled.h2`
  font-size: var(--f8);
  font-weight: 900;
`

const Text = styled.p`
  ${copy}
  margin-top: var(--s4);
  margin-bottom: var(--s1);
`

function Subscribe() {
  return (
    <Section>
      <Heading>Subscribe</Heading>
      <NetlifyForm />
    </Section>
  )
}

export default Subscribe
