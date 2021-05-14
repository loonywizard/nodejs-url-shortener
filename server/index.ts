require('dotenv').config()

import express, { Request, Response } from 'express'
import { json as jsonBodyParser } from 'body-parser'
import { nanoid } from 'nanoid'
import webpack from 'webpack'
import path from 'path'
import { Server as HTTPServer } from 'http'
import webpackDevMiddleware from 'webpack-dev-middleware'
import webpackConfig from '../webpack.config'
import { IUrl, UrlModel } from './models/url'
import { connectToDB } from './db'


const isProd = process.env.NODE_ENV === 'production'

const PORT = process.env.PORT || 3000
const app = express()

app.use(jsonBodyParser())

const httpServer = new HTTPServer(app)

// const publicPath = (webpackConfig.output && webpackConfig.output.publicPath || '') as string

if (isProd) {
  // in prod server will be in dist/server folder
  app.use('/static', express.static(path.resolve(__dirname, '../client')))
} else {
  const webpackCompiler = webpack(webpackConfig)

  app.use(webpackDevMiddleware(webpackCompiler))
}

app.get('/', (req: Request, res: Response) => {
  res.sendFile(path.join(__dirname, '../assets/index.html'))
})

app.post('/api/add-url', async (req: Request, res: Response) => {
  try {
    // TODO: validate url

    // TODO: req.path.slice(1) refactor
    const existingUrl: IUrl | null = await UrlModel.findOne({ shortUrl: req.body.url.slice(1) }).exec()

    if (existingUrl !== null) return res.send({ shortUrl: existingUrl.shortUrl })
    
    // TODO: refactor withour let
    let isUniq = false
    let generatedShortUrl = null

    while (!isUniq) {
      generatedShortUrl = nanoid(10)
      
      const url: IUrl | null = await UrlModel.findOne({ shortUrl: generatedShortUrl }).exec()

      if (url === null) isUniq = true
    }
    
    const url = await UrlModel.create({ shortUrl: generatedShortUrl, fullUrl: req.body.url })

    await url.save()

    res.send({ shortUrl: url.shortUrl })
  } catch (error) {
    console.error(error)

    res.status(500).send('Internal Server Error')
  }
})

app.get('*', async (req: Request, res: Response) => {
  try {
    // TODO: req.path.slice(1) refactor
    const url: IUrl | null = await UrlModel.findOne({ shortUrl: req.path.slice(1) }).exec()

    // TODO: better 404 landing
    if (url === null) return res.status(400).send('400')
    
    res.redirect(url.fullUrl)
  } catch (error) {
    console.error(error)

    res.status(500).send('Internal Server Error')
  }
})

async function startHttpServer() {
  await connectToDB()

  httpServer.listen(PORT, () => {
    console.log(`App is running on port ${PORT}`)
  })
}

startHttpServer()
