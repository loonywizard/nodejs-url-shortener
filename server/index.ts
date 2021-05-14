require('dotenv').config()

import express, { Request, Response } from 'express'
import { json as jsonBodyParser } from 'body-parser'
import webpack from 'webpack'
import path from 'path'
import { Server as HTTPServer } from 'http'
import webpackDevMiddleware from 'webpack-dev-middleware'
import webpackConfig from '../webpack.config'
import { addUrlController } from './api/addUrl'
import { getFullUrlController } from './api/getFullUrl'
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

app.post('/api/add-url', addUrlController)

// TODO: better path here
app.get('*', getFullUrlController)


async function startHttpServer() {
  await connectToDB()

  httpServer.listen(PORT, () => {
    console.log(`App is running on port ${PORT}`)
  })
}

startHttpServer()
