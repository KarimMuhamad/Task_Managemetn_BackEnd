const {MongoClient} = require('mongodb')

const uri = process.env.DB_URI
const dbName = 'learn'
const client = new MongoClient(uri)

async function connectDB() {
  try {
    await client.connect()
    console.log('Koneksi ke database sukses')
    return client.db(dbName)
  } catch (err) {
    console.log('Gagal terkoneksi ke database')
    process.exit(1)
  }
}

module.exports = connectDB
