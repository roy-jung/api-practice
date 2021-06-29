const userResolver = {
  Query: {
    users: (parent, args, { db }) => Object.values(db.users),
    user: (parent, { id }, { db }) => db.users[id],
  },
}

export default userResolver
