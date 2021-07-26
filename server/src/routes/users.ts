import { readDB } from '../dbController'
import { DBField, ICustomRoute, IUsers, METHOD } from '../types'

const getUsers = (): IUsers => readDB(DBField.USERS)

const usersRoute: ICustomRoute[] = [
  {
    method: METHOD.GET,
    route: '/users',
    handler: (req, res) => {
      const users = getUsers()
      res.send(users)
    },
  },
  {
    method: METHOD.GET,
    route: '/users/:id',
    handler: ({ params: { id } }, res) => {
      try {
        const users = getUsers()
        const user = users[id]
        if (!user) throw Error('사용자가 없습니다.')
        res.send(user)
      } catch (err) {
        res.status(500).send({ error: err })
      }
    },
  },
]

export default usersRoute
