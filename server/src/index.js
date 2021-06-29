import jsonServer from 'json-server'
import cors from 'cors'
import messagesRoute from './routes/messages.js'

const app = jsonServer.create()
const router = jsonServer.router('./src/db.json')

app.use(
  cors({
    origin: 'http://localhost:3000',
    credentials: true,
  }),
)

app.use(jsonServer.bodyParser)

const routes = messagesRoute
routes.forEach(({ method, route, handler }) => {
  app[method](route, handler)
})

app.use(router)

app.listen(8000, () => {
  console.log('server listening on 8000...')
})
