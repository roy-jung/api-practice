export enum METHOD {
  GET = 'get',
  POST = 'post',
  PUT = 'put',
  DELETE = 'delete',
}

export interface IMessage {
  id: string
  userId: string
  timestamp: number
  text: string
}

export interface IUser {
  id: string
  nickname: string
}

export interface IUsers {
  [key: string]: IUser
}
