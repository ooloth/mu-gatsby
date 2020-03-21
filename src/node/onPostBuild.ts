import path from 'path'
import fs from 'fs'
import { zipFunctions } from '@netlify/zip-it-and-ship-it'

function onPostBuild() {
  const srcLocation = path.join(__dirname, './src/functions')
  const outputLocation = path.join(__dirname, './public/functions')

  if (!fs.existsSync(outputLocation)) {
    fs.mkdirSync(outputLocation)
  }

  return zipFunctions(srcLocation, outputLocation)
}

export { onPostBuild }
