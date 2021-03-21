import mongoose, { model, Schema, Document } from 'mongoose'


interface IURL extends Document {
  shortUrl: string,
  fullUrl: string,
}

const URLSchema = new Schema<IURL>({
  shortUrl: { type: String, required: true },
  fullUrl: { type: String, required: true },
}) 

const URLModel = model<IURL>('URL', URLSchema)

async function initTestData() {
  const url1: IURL = await URLModel.create({ shortUrl: 'goo', fullUrl: 'https://google.com' })
  const url2: IURL = await URLModel.create({ shortUrl: 'yt', fullUrl: 'https://youtube.com' })

  await Promise.all(
    [url1, url2].map((cat) => cat.save())
  ).then(() => console.log('urls saved to DB!'))

  URLModel.find((err, urls) => {
    if (err) return console.error(err)
    
    console.log(urls)
  })
}

async function connectToDB(): Promise<void> {
  try {
    await mongoose.connect('mongodb://localhost:27017/my-db', {
      useNewUrlParser: true,
      useUnifiedTopology: true
    })

    await initTestData()
  } catch (error) {
    console.error(`connection error: ${error}`)

    process.exit(0)
  }
}

export { connectToDB }
