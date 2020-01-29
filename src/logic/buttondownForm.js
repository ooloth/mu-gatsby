import { Machine, assign } from "xstate";

export const buttondownFormMachine = Machine(
  {
    id: `buttondownFormMachine`,
    context: {
      email: ""
    },
    initial: `filling`,
    states: {
      filling: {
        on: {
          UPDATE_EMAIL: {
            actions: `updateEmail`
          },
          SUBMIT: `sending`
        }
      },

      sending: {
        invoke: {
          src: "sendFormToButtonDown",
          onDone: "success",
          onError: "error"
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
      updateEmail: assign({ email: (ctx, ev) => ev.email }),
      logError: (ctx, e) =>
        console.log(
          `error: `,
          e.error,
          `\nresult: `,
          e.result,
          `\nmsg: `,
          e.msg
        )
    },

    services: {
      sendFormToButtonDown
    }
  }
);

///////////////////////////////////////////////////////////////////////////////////

async function sendFormToButtonDown(ctx) {
  const { email } = ctx;

  return fetch("https://api.buttondown.email/v1/subscribers", {
    method: "POST",
    headers: {
      Authorization: `Token ${process.env.GATSBY_BUTTONDOWN_API_KEY}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ email })
  })
    .then(response => response.json())
    .then(() => {
      console.log(`Submitted email to Buttondown successfully.`);
    });
}
