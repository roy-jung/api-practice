import MsgList from '../components/MsgList'
import { fetcher } from '../queryClient'
import { GET_MESSAGES } from '../graphql/message'
import { Message } from '../types'

const Home = ({ smsgs }: { smsgs: Message[] }) => (
  <>
    <h1>SIMPLE SNS</h1>
    <MsgList smsgs={smsgs} />
  </>
)

export const getServerSideProps = async () => {
  const { messages: smsgs }: { messages: Message[] } = await fetcher(GET_MESSAGES)
  return {
    props: { smsgs },
  }
}

export default Home
