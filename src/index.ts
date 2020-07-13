import connect from "./connect";
import messages from "./messages";

async function main() {
  const { client } = await connect.connect();

  client.setOnPresenceUpdate((json) =>
    console.log(json.id + " presence is " + json.type)
  );
  client.setOnMessageStatusChange((json) => {
    const participant = json.participant ? " (" + json.participant + ")" : "";
    console.log(
      `${json.to}${participant} menssagem(s) aceita(s) ${json.ids} as ${json.type}`
    );
  });
  messages.verifyMessages(client);
  client.setOnUnexpectedDisconnect((err) =>
    console.log("disconnected unexpectedly: " + err)
  );
}

main().catch((err) => console.log(`encountered error: ${err}`));
