import express from 'express'
import { ApolloServer } from 'apollo-server-express'
import cors from 'cors'
import resolvers from './resolvers/index.js'
import schema from './schema/index.js'
import { readDB } from './dbController.js'

const app = express()
app.use(
  cors({
    origin: 'http://localhost:3000',
    credentials: true,
  }),
)

const server = new ApolloServer({
  typeDefs: schema,
  resolvers,
  context: {
    db: {
      messages: readDB('messages'),
      users: readDB('users'),
    },
  },
})

server.applyMiddleware({ app, path: '/graphql' })

app.listen(8000, () => {
  console.log('server listening on 8000...')
})
