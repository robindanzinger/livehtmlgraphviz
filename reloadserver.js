const WSS = require('websocket').server
const http = require('http')
const fs = require('fs')

function init() {
  let connections = []
  const server = http.createServer()
  server.listen(3003)

  const wss = new WSS({
    httpServer: server,
    autoAcceptConnections: false 
  })

  wss.on('request', request => {
    const connection = request.accept('autoreload', request.origin)
    connections.push(connection)
    setTimeout(() => {
      connections = connections.filter(c => c.state === 'open')
    }, 500)
  })

  let waitForUpdate = false

  function watch (pages) {
    pages.forEach(p => {

      console.log('watch dir:', p)
      fs.watch(p, (evt, filename) => {
        if (waitForUpdate) {
          return
        }
        waitForUpdate = true
        setTimeout(updateClients, 1);
      })
    })
  }

  function updateClients () {
    connections.forEach(c => c.send('reload'))
    waitForUpdate = false
  }

  watch(['./dist']);
}


module.exports = {init}
