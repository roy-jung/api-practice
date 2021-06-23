import express from 'express'
import { ApolloServer } from 'apollo-server-express'
import cors from 'cors'
import resolvers from './resolvers/index.js'
import schema from './schema/index.js'
import db from './dbController.js'

const readDB = () => {
  db.read()
  return db.data
}

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
    models: readDB(),
  },
})

server.applyMiddleware({ app, path: '/graphql' })

app.listen(8000, () => {
  console.log('server listening on 8000...')
})
