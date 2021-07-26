import { IUser } from '../types'
import MsgInput from './MsgInput'

const MsgItem = ({
  id,
  timestamp,
  text,
  isEditing,
  myId,
  user,
  onUpdate,
  onDelete,
  startEdit,
}: {
  id: string
  timestamp: number
  text: string
  isEditing: boolean
  myId: string
  user: IUser
  onUpdate: (id: string, text: string) => void
  onDelete: () => void
  startEdit: () => void
}) => (
  <li className="messages__item">
    <h3>
      {user.nickname}{' '}
      <sub>
        {new Date(timestamp).toLocaleString('ko-KR', {
          year: 'numeric',
          month: 'numeric',
          day: 'numeric',
          hour: '2-digit',
          minute: '2-digit',
          hour12: true,
        })}
      </sub>
    </h3>

    {isEditing ? (
      <>
        <MsgInput mutate={onUpdate} text={text} id={id} />
      </>
    ) : (
      text
    )}

    {myId === user.id && (
      <div className="messages__buttons">
        <button onClick={startEdit}>수정</button>
        <button onClick={onDelete}>삭제</button>
      </div>
    )}
  </li>
)

export default MsgItem
