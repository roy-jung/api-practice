import { useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/router'
import { useQueryClient, useMutation, useQuery } from 'react-query'
import MsgItem from './MsgItem'
import MsgInput from './MsgInput'
import { QueryKeys, fetcher } from '../queryClient'
import { GET_MESSAGES, CREATE_MESSAGE, UPDATE_MESSAGE, DELETE_MESSAGE } from '../graphql/message'
// import useInfiniteScroll from '../hooks/useInfiniteScroll'

const MsgList = ({ smsgs, users }) => {
  const client = useQueryClient()
  const {
    query: { userId = '' },
  } = useRouter()
  const [msgs, setMsgs] = useState(smsgs)
  const [editingId, setEditingId] = useState(null)

  /* const [hasNext, setHasNext] = useState(true)
  const fetchMoreEl = useRef(null)
  const intersecting = useInfiniteScroll(fetchMoreEl) */

  const { mutate: onCreate } = useMutation(({ text }) => fetcher(CREATE_MESSAGE, { text, userId }), {
    onSuccess: ({ createMessage }) => {
      client.setQueryData(QueryKeys.MESSAGES, old => {
        return {
          messages: [createMessage, ...old.messages],
        }
      })
    },
  })

  const { mutate: onUpdate } = useMutation(({ text, id }) => fetcher(UPDATE_MESSAGE, { text, id, userId }), {
    onSuccess: ({ updateMessage }) => {
      client.setQueryData(QueryKeys.MESSAGES, old => {
        const targetIndex = old.messages.findIndex(msg => msg.id === updateMessage.id)
        if (targetIndex < 0) return old
        const newMsgs = [...old.messages]
        newMsgs.splice(targetIndex, 1, updateMessage)
        return { messages: newMsgs }
      })
      doneEdit()
    },
  })

  const { mutate: onDelete } = useMutation(id => fetcher(DELETE_MESSAGE, { id, userId }), {
    onSuccess: ({ deleteMessage: deletedId }) => {
      client.setQueryData(QueryKeys.MESSAGES, old => {
        const targetIndex = old.messages.findIndex(msg => msg.id === deletedId)
        if (targetIndex < 0) return old
        const newMsgs = [...old.messages]
        newMsgs.splice(targetIndex, 1)
        return { messages: newMsgs }
      })
    },
  })

  const doneEdit = () => setEditingId(null)

  const { data, error, isError } = useQuery(QueryKeys.MESSAGES, () => fetcher(GET_MESSAGES))

  useEffect(() => {
    if (!data?.messages) return
    console.log('msgs changed')
    setMsgs(data.messages)
  }, [data?.messages])

  if (isError) {
    console.error(error)
    return null
  }

  /* useEffect(() => {
    if (intersecting && hasNext) getMessages()
  }, [intersecting]) */

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
            user={users.find(x => userId === x.id)}
          />
        ))}
      </ul>
      {/* <div ref={fetchMoreEl} /> */}
    </>
  )
}

export default MsgList
