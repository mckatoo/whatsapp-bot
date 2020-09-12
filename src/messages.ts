import { MessageType, WAConnection } from '@adiwajshing/baileys'
import { getMenu } from 'menus'

export class Messages {
  public readonly client: WAConnection

  constructor(client: WAConnection) {
    this.client = client
  }

  async verifyMessages(): Promise<void> {
    this.client.on('message-new', async m => {
      const { message, key } = m
      message?.conversation &&
        key.remoteJid &&
        this.sendMessage(key.remoteJid, await getMenu(message?.conversation))
    })
  }

  async sendMessage(remoteJid: string, message: string): Promise<void> {
    this.client.sendMessage(remoteJid, message, MessageType.text)
  }
}
