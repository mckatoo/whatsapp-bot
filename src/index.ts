import {
  WAClient,
  getNotificationType,
  MessageType,
  decodeMediaMessage,
  Presence,
  MessageOptions,
  Mimetype,
  WALocationMessage,
  MessageLogLevel,
} from "@adiwajshing/baileys";
import * as fs from "fs";

async function example() {
  const client = new WAClient();
  client.autoReconnect = true;
  client.logLevel = MessageLogLevel.none;
  const [user, chats, contacts, unread] = await client.connect(
    "./auth_info.json",
    20 * 1000
  );

  console.log("oh hello " + user.name + " (" + user.id + ")");
  console.log("you have " + unread.length + " unread messages");
  console.log(
    "you have " + chats.length + " chats & " + contacts.length + " contacts"
  );

  const authInfo = client.base64EncodedAuthInfo();
  fs.writeFileSync("./auth_info.json", JSON.stringify(authInfo, null, "\t"));
  // client.setOnTakenOver(async () => {
  // uncomment to reconnect whenever the connection gets taken over from somewhere else
  // await client.connect ()
  // });
  client.setOnPresenceUpdate((json) =>
    console.log(json.id + " presence is " + json.type)
  );
  client.setOnMessageStatusChange((json) => {
    const participant = json.participant ? " (" + json.participant + ")" : "";
    console.log(
      `${json.to}${participant} acknlowledged message(s) ${json.ids} as ${json.type}`
    );
  });
  client.setOnUnreadMessage(true, async (m) => {
    const [notificationType, messageType] = getNotificationType(m);
    console.log("got notification of type: " + notificationType);

    if (notificationType !== "message") {
      return;
    }
    if (m.key.fromMe) {
      console.log("relayed my own message");
      return;
    }

    let sender = m.key.remoteJid;
    if (m.key.participant) {
      sender += " (" + m.key.participant + ")";
    }
    if (messageType === MessageType.text) {
      const text = m.message?.conversation;
      console.log(sender + " sent: " + text);
    } else if (messageType === MessageType.extendedText) {
      const text = m.message?.extendedTextMessage?.text;
      console.log(
        sender +
          " sent: " +
          text +
          " and quoted message: " +
          JSON.stringify(m.message)
      );
    } else if (messageType === MessageType.contact) {
      const contact = m.message?.contactMessage;
      console.log(
        sender +
          " sent contact (" +
          contact?.displayName +
          "): " +
          contact?.vcard
      );
    } else if (
      messageType === MessageType.location ||
      messageType === MessageType.liveLocation
    ) {
      const locMessage =
        m.message != null && m.message != undefined
          ? (m.message[messageType] as WALocationMessage)
          : ({} as WALocationMessage);
      console.log(
        `${sender} sent location (lat: ${locMessage.degreesLatitude}, long: ${locMessage.degreesLongitude})`
      );

      m.message != null && m.message != undefined
        ? decodeMediaMessage(
            m.message,
            "./Media/media_loc_thumb_in_" + m.key.id
          )
        : {};

      if (messageType === MessageType.liveLocation) {
        console.log(
          `${sender} sent live location for duration: ${m.duration / 60}`
        );
      }
    } else {
      try {
        const savedFile = await decodeMediaMessage(
          m.message != null && m.message != undefined ? m.message : {},
          "./Media/media_in_" + m.key.id
        );
        console.log(sender + " sent media, saved at: " + savedFile);
      } catch (err) {
        console.log("error in decoding message: " + err);
      }
    }
    setTimeout(async () => {
      await client.sendReadReceipt(
        m.key.remoteJid != null && m.key.remoteJid != undefined
          ? m.key.remoteJid
          : "",
        m.key.id != null && m.key.id != undefined ? m.key.id : ""
      );
      if (m.key.remoteJid) {
        await client.updatePresence(m.key.remoteJid, Presence.available);
        await client.updatePresence(m.key.remoteJid, Presence.composing);
      }

      const options: MessageOptions = { quoted: m };
      let content;
      let type: MessageType;
      const rand = Math.random();
      if (rand > 0.66) {
        content = "hello!";
        type = MessageType.text;
      } else if (rand > 0.33) {
        content = { degreesLatitude: 32.123123, degreesLongitude: 12.12123123 };
        type = MessageType.location;
      } else {
        content = fs.readFileSync("./Media/ma_gif.mp4");
        options.mimetype = Mimetype.gif;
        type = MessageType.video;
      }
      if (m.key.remoteJid) {
        const response = await client.sendMessage(
          m.key.remoteJid,
          content,
          type,
          options
        );
        console.log(
          "sent message with ID '" +
            response.messageID +
            "' successfully: " +
            (response.status === 200)
        );
      }
    }, 3 * 1000);
  });

  /* example of custom functionality for tracking battery */
  // client.registerCallback(["action", null, "battery"], (json) => {
  //   const batteryLevelStr = json[2][0][1].value;
  //   const batterylevel = parseInt(batteryLevelStr);
  //   console.log("battery level: " + batterylevel);
  // });
  client.setOnUnexpectedDisconnect((err) =>
    console.log("disconnected unexpectedly: " + err)
  );
}

example().catch((err) => console.log(`encountered error: ${err}`));
