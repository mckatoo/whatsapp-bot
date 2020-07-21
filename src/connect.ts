import * as fs from 'fs'
import { MessageLogLevel, WAClient } from '@adiwajshing/baileys'

export default class Connect {
public static async connect() {
    const client = new WAClient()
    client.autoReconnect = true
    client.logLevel = MessageLogLevel.none
    const [user, chats, contacts, unread] = await client.connect(
      './auth_info.json',
      20 * 1000
    )

    console.log('Olá ' + user.name + ' (' + user.id + ')')
    console.log(`Você tem ${unread.length}  mensagens não lidas.`)
    console.log(`Você tem ${chats.length} chats e ${contacts.length} contatos`)

    const authInfo = client.base64EncodedAuthInfo()
    fs.writeFileSync('./auth_info.json', JSON.stringify(authInfo, null, '\t'))

    return { client }
  }
}
