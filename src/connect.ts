import * as fs from "fs";
import {
  MessageLogLevel,
  WAClient,
} from "@adiwajshing/baileys";

class Connect {
  async connect() {
    const client = new WAClient();
    client.autoReconnect = true;
    client.logLevel = MessageLogLevel.none;
    const [user, chats, contacts, unread] = await client.connect(
      "./auth_info.json",
      20 * 1000
    );

    // console.log("oh hello " + user.name + " (" + user.id + ")");
console.log(`Você tem ${unread.length}  mensagens não lidas.`);
console.log(
     `Você tem ${ chats.length } chats e ${contacts.length} contatos`
    );

    const authInfo = client.base64EncodedAuthInfo();
    fs.writeFileSync("./auth_info.json", JSON.stringify(authInfo, null, "\t"));

    return { client };
  }
}

export default new Connect();
