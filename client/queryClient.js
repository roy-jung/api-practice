import { request } from 'graphql-request'
const URL = 'http://localhost:8000/graphql'

export const fetcher = (query, variables = {}) => request(URL, query, variables)

export const QueryKeys = {
  MESSAGES: 'MESSAGES',
  MESSAGE: 'MESSAGE',
  USERS: 'USERS',
  USER: 'USER',
}

export const findTargetMsgIndex = (pages, id) => {
  let msgIndex = -1
  const pageIndex = pages.findIndex(({ messages }) => {
    msgIndex = messages.findIndex(msg => msg.id === id)
    if (msgIndex > -1) {
      return true
    }
    return false
  })
  return { pageIndex, msgIndex }
}

export const getNewMessages = old => ({
  pageParams: old.pageParams,
  pages: old.pages.map(({ messages }) => ({ messages: [...messages] })),
})
