import * as fs from 'fs'
import { MessageLogLevel, WAClient } from '@adiwajshing/baileys'

export default class Connect {
  public static async connect(): Promise<WAClient> {
    const client = new WAClient()
    client.autoReconnect = true
    client.logLevel = MessageLogLevel.none
    const [user, chats, contacts] = await client.connect(
      './auth_info.json',
      20 * 1000
    )

    console.log('Olá ' + user.name + ' (' + user.id + ')')
    console.log(`Você tem ${chats.all().length} chats e ${contacts.length} contatos`)

    const authInfo = client.base64EncodedAuthInfo()
    fs.writeFileSync('./auth_info.json', JSON.stringify(authInfo, null, '\t'))

    return client
  }
}
