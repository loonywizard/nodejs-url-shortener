import mongoose from 'mongoose'


async function connectToDB(): Promise<void> {
  try {
    await mongoose.connect('mongodb://localhost:27017/my-db', {
      useNewUrlParser: true,
      useUnifiedTopology: true
    })
  } catch (error) {
    console.error(`connection error: ${error}`)

    process.exit(0)
  }
}

export { connectToDB }
