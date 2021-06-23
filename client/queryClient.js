import { request } from 'graphql-request'
const URL = 'http://localhost:8000/graphql'

export const fetcher = (query, variables = {}) => request(URL, query, variables)

export const QueryKeys = {
  MESSAGES: 'MESSAGES',
  MESSAGE: 'MESSAGE',
  USERS: 'USERS',
  USER: 'USER',
}
