import { useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/router'
import MsgItem from './MsgItem'
import MsgInput from './MsgInput'
import fetcher from '../fetcher'
import useInfiniteScroll from '../hooks/useInfiniteScroll'

const MsgList = ({ smsgs, users }) => {
  const {
    query: { userId = '' },
  } = useRouter()
  const [msgs, setMsgs] = useState(smsgs)
  const [editingId, setEditingId] = useState(null)
  const [hasNext, setHasNext] = useState(true)
  const fetchMoreEl = useRef(null)
  const intersecting = useInfiniteScroll(fetchMoreEl)

  const onCreate = async text => {
    const newMsg = await fetcher('post', '/messages', { text, userId })
    if (!newMsg) throw Error('something wrong')
    setMsgs(msgs => [newMsg, ...msgs])
  }

  const onUpdate = async (text, id) => {
    const newMsg = await fetcher('put', `/messages/${id}`, { text, userId })
    if (!newMsg) throw Error('something wrong')
    setMsgs(msgs => {
      const targetIndex = msgs.findIndex(msg => msg.id === id)
      if (targetIndex < 0) return msgs
      const newMsgs = [...msgs]
      newMsgs.splice(targetIndex, 1, newMsg)
      return newMsgs
    })
    doneEdit()
  }

  const onDelete = async id => {
    await fetcher('delete', `/messages/${id}`, { params: { userId } })
    setMsgs(msgs => {
      const targetIndex = msgs.findIndex(msg => msg.id === id)
      if (targetIndex < 0) return msgs
      const newMsgs = [...msgs]
      newMsgs.splice(targetIndex, 1)
      return newMsgs
    })
  }

  const doneEdit = () => setEditingId(null)

  const getMessages = async () => {
    const _start = msgs.length
    const _end = _start + 15
    const newMsgs = await fetcher('get', '/messages', { params: { _start, _end, _sort: 'timestamp', _order: 'desc' } })
    if (newMsgs.length === 0) {
      setHasNext(false)
      return
    }
    setMsgs(msgs => [...msgs, ...newMsgs])
  }

  useEffect(() => {
    if (intersecting && hasNext) getMessages()
  }, [intersecting])

  console.log({ intersecting, hasNext, msgs })

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
            myId={userId}
            user={users.find(user => user.id === x.userId)}
          />
        ))}
      </ul>
      <div ref={fetchMoreEl} />
    </>
  )
}

export default MsgList
