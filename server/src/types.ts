export enum DBField {
  MESSAGES = 'messages',
  USERS = 'users',
}

export interface IMessage {
  id: string
  text: string
  userId: string
  timestamp: number
}

export interface IUser {
  id: string
  nickname: string
}

export interface IResolver {
  [key: string]: {
    [key: string]: (
      parent: any,
      variables: { [key: string]: any },
      context: {
        db: {
          messages: IMessage[]
          users: { [key: string]: IUser }
        }
      },
    ) => any
  }
}
