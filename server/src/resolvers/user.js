const userResolver = {
  Query: {
    users: (parent, args, { models }) => Object.values(models.users),
    user: (parent, { id }, { models }) => models.users[id],
  },
}

export default userResolver
