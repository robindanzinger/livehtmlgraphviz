const express = require('express')
const app = express()
const reloadserver = require('./reloadserver.js')
const port = 5000

app.use(express.static('dist'))

app.get("/", function (req, res) {
  res.send(renderPage())
})

function renderPage() {
  return `<!DOCTYPE HTML>
          <html>
          <head>
          </head>
          <body>
          <img src="/targetfile.svg" />
          <script src="/reloadpage.js"></script>
          </body>`
}
reloadserver.init()
app.listen(port, () => console.log(`Listening to port ${port}`))
