export interface IUser {
  id: string
  nickname: string
}

export interface IMessage {
  id: string
  userId: string
  timestamp: number
  text: string
  user: IUser
}

export type TMutate = ({ text, id }: { text: string; id?: string }) => void

export interface IMsgQueryData {
  pages: { messages: IMessage[] }[]
  pageParams: string
}
