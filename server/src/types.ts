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

export interface CustomRoute {
  method: METHOD
  route: string
  handler: (req: express.Request, res: express.Response) => void
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

export interface Users {
  [key: string]: User
}
