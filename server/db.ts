import mongoose from 'mongoose'

async function connectToDB(): Promise<void> {
  try {
    const { DB_URL, DB_NAME, DB_USER, DB_PASSWORD } = process.env

    await mongoose.connect(`mongodb+srv://${DB_USER}:${DB_PASSWORD}@${DB_URL}/${DB_NAME}`, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    })
  } catch (error) {
    console.error(`connection error: ${error}`)

    process.exit(0)
  }
}

export { connectToDB }
