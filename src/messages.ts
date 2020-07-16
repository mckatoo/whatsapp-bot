import {
  getNotificationType,
  MessageType,
  WAClient,
  decodeMediaMessage,
} from '@adiwajshing/baileys'
import { sendMenu } from './menus'
import fs from 'fs'

class Messages {
  async verifyMessages(client: WAClient) {
    const menu = 'principal'
    client.setOnUnreadMessage(true, async m => {
      const [notificationType, messageType] = getNotificationType(m)
      console.log('Recebeu notificação do tipo: ' + notificationType)
      console.log('Recebeu mensagem do tipo: ' + messageType)

      if (notificationType !== 'message') {
        return
      }
      if (m.key.fromMe) {
        console.log('Retransmitiu minha própria mensagem.')
        return
      }

      let sender = m.key.remoteJid

      if (m.key.participant) {
        sender += ' (' + m.key.participant + ')'
      }

      if (messageType === MessageType.text && sender != null) {
        const text = m.message?.conversation
        console.log(sender + ' Enviou: ' + text)
        if (text != '' && menu === 'principal') {
          sendMenu('principal', sender, client, MessageType.text)
        }
      } else if (
        messageType === MessageType.audio &&
        sender != null &&
        m.message != null
      ) {
        const audio = await decodeMediaMessage(
          m.message,
          `./public/audio/audio_in_${m.key.id}`
        )
        const audioFile = fs.readFileSync(audio.toString())

        // INICIO DA TRANSCRIÇÃO DO AUDIO EM TEXTO
        client.sendMessage(sender, audioFile, MessageType.audio)
      }
    })
  }
}

export default new Messages()
