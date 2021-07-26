import { IResolver } from '../types'

const userResolver: IResolver = {
  Query: {
    users: (parent, args, { db }) => Object.values(db.users),
    user: (parent, { id }, { db }) => db.users[id],
  },
}

export default userResolver
