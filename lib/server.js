import express from 'express'
import {init as initReloadserver} from './reloadserver.js'
import {init as initGraphviz} from './graphviz.js'
import {openBrowser} from './openbrowser.js'
import fs from 'fs'
import {promises as fsp} from 'fs'

const app = express()
const config = JSON.parse(fs.readFileSync('./config.json'))

console.log('CONFIGURATION is:', config)
app.use(express.static(config.target))

app.get('/lib/reloadpage.js', function(req, res) {
  res.send(
`
const socket = new WebSocket('ws://localhost:${config.wssport}/', 'autoreload')

socket.onmessage = (msg) => {
  if (/reload/.test(msg.data)) {
    setTimeout(() => {
    location.reload(true)
    }, 1)
  }
}
`)
})

app.get("/", async function (req, res) {
  res.send(await renderPage())
})


async function renderPage() {
  const imgs = await fsp.readdir(config.target, {withFileTypes: true})
  const imghtml = imgs.filter(i => i.isFile()).map(i => { return `<img src="${i.name}" />` }).join('')
  return `<!DOCTYPE HTML>
          <html>
          <head>
          </head>
          <body>
          ${imghtml}
          <script src="/lib/reloadpage.js"></script>
          </body>`
}
initReloadserver(config)
initGraphviz(config)
app.listen(config.port, () => console.log(`Listening to port ${config.port}`))
openBrowser(config)
