import { GraphQLClient } from 'graphql-request'
import dotenv from 'dotenv'

dotenv.config({ path: __dirname + '/.env' })

const client = new GraphQLClient(
  process.env.GRAPHQL_HOST || 'http://localhost:1337/graphql'
)

export default client
