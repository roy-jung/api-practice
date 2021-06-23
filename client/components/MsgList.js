import { useState } from 'react'
import MsgItem from './MsgItem'
import MsgInput from './MsgInput'

const UserIds = ['roy', 'jay']
const getRandomUserId = () => UserIds[Math.round(Math.random())]

const originalMsgs = Array(50)
  .fill(0)
  .map((_, i) => ({
    id: 50 - i,
    userId: getRandomUserId(),
    timestamp: 1234567890123 + (50 - i) * 1000 * 60,
    text: `${50 - i} mock text`,
  }))

const MsgList = () => {
  const [msgs, setMsgs] = useState(originalMsgs)
  const [editingId, setEditingId] = useState(null)

  const onCreate = text => {
    const newMsg = {
      id: msgs.length + 1,
      userId: getRandomUserId(),
      timestamp: Date.now(),
      text: `${msgs.length + 1} ${text}`,
    }
    setMsgs(msgs => [newMsg, ...msgs])
  }

  const onUpdate = (text, id) => {
    setMsgs(msgs => {
      const targetIndex = msgs.findIndex(msg => msg.id === id)
      if (targetIndex < 0) return msgs
      const newMsgs = [...msgs]
      newMsgs.splice(targetIndex, 1, {
        ...msgs[targetIndex],
        text,
      })
      return newMsgs
    })
    doneEdit()
  }

  const onDelete = id => {
    setMsgs(msgs => {
      const targetIndex = msgs.findIndex(msg => msg.id === id)
      if (targetIndex < 0) return msgs
      const newMsgs = [...msgs]
      newMsgs.splice(targetIndex, 1)
      return newMsgs
    })
  }

  const doneEdit = () => setEditingId(null)

  return (
    <>
      <MsgInput mutate={onCreate} />
      <ul className="messages">
        {msgs.map(x => (
          <MsgItem
            key={x.id}
            {...x}
            onUpdate={onUpdate}
            onDelete={() => onDelete(x.id)}
            startEdit={() => setEditingId(x.id)}
            isEditing={editingId === x.id}
          />
        ))}
      </ul>
    </>
  )
}

export default MsgList
