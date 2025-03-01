const {MongoClient} = require('mongodb')

const uri = process.env.DB_URI
const dbName = process.env.DB_NAME
const client = new MongoClient(uri)

let db = ''

const connDB = async () => {
  try {
    await client.connect()
    console.log('Succes Connected to database')
    db = client.db(dbName)
  } catch (err) {
    console.log('Failed Connected to database')
    process.exit(1)
  }
}

const getDB = () => {
  if(!db) {
    throw new Error('Database Not Connected')
  }

  return db
}

module.exports = {connDB, getDB}