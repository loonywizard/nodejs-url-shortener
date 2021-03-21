import mongoose from 'mongoose'
import { IUrl, UrlModel } from './models/url'


async function initTestData() {
  const url1: IUrl = await UrlModel.create({ shortUrl: 'goo', fullUrl: 'https://google.com' })
  const url2: IUrl = await UrlModel.create({ shortUrl: 'yt', fullUrl: 'https://youtube.com' })

  await Promise.all(
    [url1, url2].map((cat) => cat.save())
  ).then(() => console.log('urls saved to DB!'))

  UrlModel.find((err, urls) => {
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
