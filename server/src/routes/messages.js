import { v4 } from 'uuid'
import db from '../dbController.js'

const getMsgs = () => {
  db.read()
  db.data = db.data || { messages: [] }
  return db.data.messages
}

const messagesRoute = [
  {
    method: 'post',
    route: '/messages',
    handler: ({ body }, res) => {
      try {
        if (!body.userId) throw Error('no userId')
        const msgs = getMsgs()
        const newMsg = {
          id: v4(),
          text: body.text,
          userId: body.userId,
          timestamp: Date.now(),
        }
        db.data.messages.unshift(newMsg)
        db.write()
        res.send(newMsg)
      } catch (err) {
        res.status(500).send({ error: err })
      }
    },
  },
  {
    method: 'put',
    route: '/messages/:id',
    handler: ({ body, params: { id } }, res) => {
      try {
        const msgs = getMsgs()
        const targetIndex = msgs.findIndex(msg => msg.id === id)
        if (targetIndex < 0) throw '메시지가 없습니다.'
        if (msgs[targetIndex].userId !== body.userId) throw '사용자가 다릅니다.'

        const newMsg = { ...msgs[targetIndex], text: body.text }
        db.data.messages.splice(targetIndex, 1, newMsg)
        db.write()
        res.send(newMsg)
      } catch (err) {
        res.status(500).send({ error: err })
      }
    },
  },
]

export default messagesRoute
