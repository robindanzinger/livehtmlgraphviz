import websocket from 'websocket'
const WSS = websocket.server
import http from 'http'
import fs from 'fs'

export function init(config) {
  let connections = []
  const server = http.createServer()
  server.listen(config.wssport)

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
