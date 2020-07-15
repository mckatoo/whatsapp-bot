import {
  getNotificationType,
  MessageType,
  WAClient,
  decodeMediaMessage,
} from "@adiwajshing/baileys";
import { Principal, Pizzas, Lanches, Porcoes } from "./menus";
import speech from "@google-cloud/speech";
import fs from "fs";
import { google } from "@google-cloud/speech/build/protos/protos";

class Messages {
  async verifyMessages(client: WAClient) {
    client.setOnUnreadMessage(true, async (m) => {
      const [notificationType, messageType] = getNotificationType(m);
      console.log("Recebeu notificação do tipo: " + notificationType);
      console.log("Recebeu mensagem do tipo: " + messageType);

      if (notificationType !== "message") {
        return;
      }
      if (m.key.fromMe) {
        console.log("Retransmitiu minha própria mensagem.");
        return;
      }

      let sender = m.key.remoteJid;

      if (m.key.participant) {
        sender += " (" + m.key.participant + ")";
      }

      if (messageType === MessageType.text && sender != null) {
        const text = m.message?.conversation;
        console.log(sender + " Enviou: " + text);
        if (text != "") {
          Principal(sender, client, MessageType.text);
        }
        switch (text) {
          case "menu":
            Principal(sender, client, MessageType.text);
            break;
          case "lanches":
            Lanches(sender, client, MessageType.text);
            break;
          case "pizza":
            Pizzas(sender, client, MessageType.text);
            break;
          case "porcoes":
            Porcoes(sender, client, MessageType.text);
            break;
          default:
            break;
        }
      } else if (
        messageType === MessageType.audio &&
        sender != null &&
        m.message != null
      ) {
        const audio = await decodeMediaMessage(
          m.message,
          `./public/audio/audio_in_${m.key.id}`
        );
        const audioFile = fs.readFileSync(audio.toString());

        // INICIO DA TRANSCRIÇÃO DO AUDIO EM TEXTO
        const googleSpeechClient = new speech.SpeechClient();
        const audioBytes = audioFile;
        const audioEncoded = {
          content: audioBytes,
        };
        const configEncode: google.cloud.speech.v1.IRecognitionConfig = {
          encoding: "LINEAR16",
          sampleRateHertz: 8000,
          languageCode: "pt-BR",
        };
        const request: google.cloud.speech.v1.IRecognizeRequest = {
          audio: audioEncoded,
          config: configEncode,
        };
        const [response] = await googleSpeechClient.recognize(request);
        const transcription = response.results
          ?.map((result: google.cloud.speech.v1.ISpeechRecognitionResult) => {
            if (result.alternatives != null) {
              result.alternatives[0].transcript;
            }
          })
          .join("\n") || "audio não reconhecido";
        console.log(`Transcrisção: ${transcription}`);
        client.sendMessage(sender, audioFile, MessageType.audio);
        client.sendMessage(sender, transcription, MessageType.text);
      }
    });
  }
}

export default new Messages();
