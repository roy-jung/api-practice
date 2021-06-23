import { LowSync, JSONFileSync } from 'lowdb'

const adapter = new JSONFileSync('./src/db.json')
const db = new LowSync(adapter)

export default db
