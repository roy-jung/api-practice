import MsgList from '../components/MsgList'
import fetcher from '../fetcher'
import { Message, Users, METHOD } from '../types'

const Home = ({ smsgs, users }: { smsgs: Message[]; users: Users }) => (
  <>
    <h1>SIMPLE SNS</h1>
    <MsgList smsgs={smsgs} users={users} />
  </>
)

export const getServerSideProps = async () => {
  const smsgs = await fetcher(METHOD.GET, '/messages')
  const users = await fetcher(METHOD.GET, '/users')
  return {
    props: { smsgs, users },
  }
}

export default Home
