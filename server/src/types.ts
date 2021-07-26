import express from 'express'

export enum DBField {
  MESSAGES = 'messages',
  USERS = 'users',
}

export enum METHOD {
  GET = 'get',
  POST = 'post',
  PUT = 'put',
  DELETE = 'delete',
}

export interface ICustomRoute {
  method: METHOD
  route: string
  handler: (req: express.Request, res: express.Response) => void
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

export interface IUsers {
  [key: string]: IUser
}
