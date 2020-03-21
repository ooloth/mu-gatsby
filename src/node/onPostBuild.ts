// See: https://joshwcomeau.com/gatsby/netlify-functions-and-gatsby-cloud/

import fs from 'fs'
import path from 'path'
// @ts-ignore
import { zipFunctions } from '@netlify/zip-it-and-ship-it'

function onPostBuild() {
  const srcLocation = path.join(__dirname, `./src/functions`)
  const outputLocation = path.join(__dirname, `./public/functions`)

  if (!fs.existsSync(outputLocation)) {
    fs.mkdirSync(outputLocation)
  }

  return zipFunctions(srcLocation, outputLocation)
}

export { onPostBuild }
