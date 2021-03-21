import express, { Request, Response } from 'express'
import webpack from 'webpack'
import { Server as HTTPServer } from 'http'
import webpackDevMiddleware from 'webpack-dev-middleware'
import webpackConfig from '../webpack.config'
import { connectToDB } from './db'

const PORT = 3000
const app = express()

const httpServer = new HTTPServer(app)

const isProd = process.env.NODE_ENV === 'production'

const outputPath = webpackConfig.output && webpackConfig.output.path || ''
// const publicPath = (webpackConfig.output && webpackConfig.output.publicPath || '') as string

if (isProd) {
  app.use('/static', express.static(outputPath))
} else {
  const webpackCompiler = webpack(webpackConfig)

  app.use(webpackDevMiddleware(webpackCompiler))
}

app.get('/', (req: Request, res: Response) => {
  res.send(`
    <!DOCTYPE html>
    <body>
      <div id="app"></div>
      <script src="static/index.js"></script>
    </body>
  `)
})

app.get('/api/data', (req: Request, res: Response) => {
  res.send('hello from nodejs server!')
})

async function startHttpServer() {
  await connectToDB()

  httpServer.listen(PORT, () => {
    console.log(`App is running on port ${PORT}`)
  })
}

startHttpServer()
