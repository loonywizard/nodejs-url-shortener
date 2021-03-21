import express, { Request, Response } from 'express'
import webpack from 'webpack'
import { Server as HTTPServer } from 'http'
import webpackDevMiddleware from 'webpack-dev-middleware'
import webpackConfig from '../webpack.config'
import { IURL, URLModel } from './models/url'
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

app.get('*', async (req: Request, res: Response) => {
  try {
    // TODO: req.path.slice(1) refactor
    const url: IURL | null = await URLModel.findOne({ shortUrl: req.path.slice(1) }).exec()

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
