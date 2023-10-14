import { io, Socket } from 'socket.io-client'

class TikTokIOConnection {
  private socket: Socket
  private uniqueId: any = null
  private options: any = null

  constructor(backendUrl: string) {
    this.socket = io(backendUrl)

    this.socket.on('connect', () => {
      console.info('Socket connected!')

      // Reconnect to streamer if uniqueId already set
      if (this.uniqueId) {
        this.setUniqueId()
      }
    })

    this.socket.on('disconnect', () => {
      console.warn('Socket disconnected!')
    })

    this.socket.on('streamEnd', () => {
      console.warn('LIVE has ended!')
      this.uniqueId = null
    })

    this.socket.on('tiktokDisconnected', (errMsg: any) => {
      console.warn(errMsg)
      if (errMsg && errMsg.includes('LIVE has ended')) {
        this.uniqueId = null
      }
    })
  }

  connect(newUniqueId: any, newOptions: any) {
    this.uniqueId = newUniqueId
    this.options = newOptions || {}

    this.setUniqueId()

    return new Promise((resolve, reject) => {
      this.socket.once('tiktokConnected', resolve)
      this.socket.once('tiktokDisconnected', reject)

      setTimeout(() => {
        reject('Connection Timeout')
      }, 15000)
    })
  }

  closeConnection() {
    this.socket.emit('disconnect')
    console.log('Connection closed')
  }

  setUniqueId() {
    this.socket.emit('setUniqueId', this.uniqueId, this.options)
  }

  on(eventName: any, eventHandler: any) {
    this.socket.on(eventName, eventHandler)
  }
}

export { TikTokIOConnection }
