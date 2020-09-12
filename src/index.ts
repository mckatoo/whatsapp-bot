import { Connect } from 'connect'
import { Messages } from 'messages'

async function main() {
  const { connect } = new Connect()
  const client = await connect()
  const messages = new Messages(client)

  messages.verifyMessages()

  client.on('close', json => {
    console.log(json)
  })
}

main().catch(err => console.log(`encountered error: ${err}`))
