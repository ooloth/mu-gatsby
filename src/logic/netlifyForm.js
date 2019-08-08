export const netlifyFormMachine = Machine(
  {
    id: `netlifyFormMachine`,
    context: {
      formName: `Subscribe`,
      values: {}
    },
    initial: `filling`,
    states: {
      filling: {
        on: {
          UPDATE_FIELD: {
            actions: [`updateField`, `logValues`]
          },
          SUBMIT: `sending`
        }
      },

      sending: {
        invoke: {
          src: 'sendFormToNetlify',
          onDone: 'success',
          onError: 'error'
        }
      },

      error: {
        entry: `logError`,
        on: { SUBMIT: `sending` }
      },

      success: {}
    }
  },
  {
    actions: {
      updateField: (ctx, e) => updateField(ctx, e),
      logValues: (ctx, e) =>
        console.log(`ctx.values: `, ctx.values, `\nevent: `, e),
      logError: (ctx, e) =>
        console.log(`error: `, e.error, `\nresult: `, e.result, `\nmsg: `, e.msg)
    },

    services: {
      sendFormToNetlify: ctx => sendFormToNetlify(ctx)
    }
  }
)

///////////////////////////////////////////////////////////////////////////////////

function updateField(ctx, e) {
  ctx.values[e.name] = e.value
}

///////////////////////////////////////////////////////////////////////////////////

async function sendFormToNetlify(ctx) {
  const encodedUrl = await constructEncodedUrl({
    'form-name': ctx.formName,
    ...ctx.values
  })

  console.log({ encodedUrl })

  return fetch(`/`, {
    method: `POST`,
    headers: { 'Content-Type': `application/x-www-form-urlencoded` },
    body: encodedUrl
  })
}

///////////////////////////////////////////////////////////////////////////////////

// See: https://www.netlify.com/blog/2017/07/20/how-to-integrate-netlifys-form-handling-in-a-react-app/

function constructEncodedUrl(formDataObject) {
  return Object.keys(formDataObject)
    .map(
      key =>
        encodeURIComponent(key) + `=` + encodeURIComponent(formDataObject[key])
    )
    .join(`&`)
}

///////////////////////////////////////////////////////////////////////////////////

import { Machine } from 'xstate'
