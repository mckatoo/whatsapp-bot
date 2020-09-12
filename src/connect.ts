import * as fs from 'fs'
import path from 'path'
import {
  MessageLogLevel,
  ReconnectMode,
  WAConnection,
} from '@adiwajshing/baileys'

export class Connect {
  async connect(): Promise<WAConnection> {
    const conn = new WAConnection()
    const fileAuthString = path.join(__dirname, 'auth_info.json')
    if (fs.existsSync(fileAuthString)) {
      conn.loadAuthInfo(fileAuthString)
    }
    await conn.connect()
    conn.autoReconnect = ReconnectMode.onConnectionLost
    conn.logLevel = MessageLogLevel.none

    console.log('Oh hello ' + conn.user.name + ' (' + conn.user.jid + ')')
    console.log('you have ' + conn.chats.all().length + ' chats')
    const authInfo = conn.base64EncodedAuthInfo()
    fs.writeFileSync(fileAuthString, JSON.stringify(authInfo, null, '\t'))

    return conn
  }
}
