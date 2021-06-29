import MsgList from '../components/MsgList'
import fetcher from '../fetcher'

const Home = ({ smsgs, users }) => (
  <>
    <h1>SIMPLE SNS</h1>
    <MsgList smsgs={smsgs} users={users} />
  </>
)

export const getServerSideProps = async () => {
  const smsgs = await fetcher('get', '/messages?_start=0&_end=15&_sort=timestamp&_order=desc')
  const users = await fetcher('get', '/users')
  return {
    props: { smsgs, users },
  }
}

export default Home
