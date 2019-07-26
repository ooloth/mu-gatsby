export const mailchimpMachine = Machine(
  {
    id: `mailchimpMachine`,
    context: {
      valid: false
      // TODO: update url (from the embed code in MailChimp > Lists)
      // mailchimpUrl: `https://facebook.us16.list-manage.com/subscribe/post?u=8355d284bef397e518268b616&amp;id=c9e1d34cef`,
    },
    initial: `entering`,
    states: {
      entering: {
        on: {
          UPDATE_FIELD: {
            actions: [`updateField`, `validateField`]
          },
          // SUBMIT: `validating`,
          SUBMIT: `sending`
        }
      },

      // validating: {
      //   entry: `validateAllFields`,
      //   on: {
      //     VALID: `sending`,
      //     INVALID: `error`,
      //   },
      // },

      sending: {
        invoke: {
          src: 'sendFormToMailchimp',
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
      updateField: assign((ctx, e) => ({ [e.name]: e.value })),
      // logValues: (ctx, e) => console.log(`ctx: `, ctx, `\nevent: `, e),
      validateField: (ctx, e) => validateField(ctx, e),
      // validateAllFields: (ctx, e) => validateAllFields(ctx, e),
      logError: (ctx, e) =>
        console.log(`error: `, e.error, `\nresult: `, e.result, `\nmsg: `, e.msg)
    },

    services: {
      sendFormToMailchimp: (ctx, e) => sendFormToMailchimp(ctx, e)
    }
  }
)

///////////////////////////////////////////////////////////////////////////////////

function validateField(ctx, e) {
  if (e.name === `email`) ctx.valid = validateEmail(e.value)
  // if (e.name === `firstName`)
  // if (e.name === `lastName`)
}

///////////////////////////////////////////////////////////////////////////////////

function validateEmail(email) {
  const emailRegex = /.+@.+..+/
  return emailRegex.test(email)
}

///////////////////////////////////////////////////////////////////////////////////

// function validateAllFields(ctx, e) {
//   let emailValid, firstNameValid, lastNameValid

//   emailValid = validateEmail(ctx.email)
//   firstNameValid = true
//   lastNameValid = true

//   if (emailValid && firstNameValid && lastNameValid) return true

//   // if (typeof ctx.firstName !== `undefined`)
//   //   firstNameValid = validateFirstName(ctx.firstName)

//   // if (typeof ctx.lastName !== `undefined`)
//   //   lastNameValid = validateLastName(ctx.lastName)
// }

///////////////////////////////////////////////////////////////////////////////////

async function sendFormToMailchimp(ctx, e) {
  const url = await constructEncodedUrl(ctx)
  return jsonp(url, { param: `c` })
}

///////////////////////////////////////////////////////////////////////////////////

async function constructEncodedUrl(ctx) {
  let url = await convertUrlToJson(ctx.mailchimpUrl)

  url += await appendEncodedEmail(url, ctx.email)
  // if (ctx.firstName) url += await appendEncodedFirstName(url, ctx.firstName)
  // if (ctx.lastName) url += await appendEncodedLastName(url, ctx.lastName)

  return url
}

///////////////////////////////////////////////////////////////////////////////////

function convertUrlToJson(url) {
  return url.replace(`/post?`, `/post-json?`)
}

///////////////////////////////////////////////////////////////////////////////////

function appendEncodedEmail(url, email) {
  return `${url}&EMAIL=${encodeURIComponent(email)}`
}

///////////////////////////////////////////////////////////////////////////////////

// function appendEncodedFirstName(url, firstName) {
//   return `${url}&FNAME=${encodeURIComponent(firstName)}`
// }

///////////////////////////////////////////////////////////////////////////////////

// function appendEncodedLastName(url, lastName) {
//   return `${url}&LNAME=${encodeURIComponent(lastName)}`
// }

///////////////////////////////////////////////////////////////////////////////////

import { Machine, assign } from 'xstate'

import jsonp from 'jsonp'
