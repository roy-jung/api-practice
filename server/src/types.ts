export enum DBField {
  MESSAGES = 'messages',
  USERS = 'users',
}

export interface Message {
  id: string
  text: string
  userId: string
  timestamp: number
}

export interface User {
  id: string
  nickname: string
}

export interface Resolver {
  [key: string]: {
    [key: string]: (
      parent: any,
      variables: { [key: string]: any },
      context: {
        db: {
          messages: Message[]
          users: { [key: string]: User }
        }
      },
    ) => any
  }
}
