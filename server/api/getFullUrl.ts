import { Request, Response } from 'express'
import { IUrl, UrlModel } from '../models/url'


async function getFullUrlController(req: Request, res: Response) {
  try {
    const url: IUrl | null = await UrlModel.findOne({ shortUrl: req.path.slice(1) }).exec()

    // TODO: better 404 landing
    if (url === null) return res.status(400).send('400')
    
    res.redirect(url.fullUrl)
  } catch (error) {
    console.error(error)

    res.status(500).send('Internal Server Error')
  }
}

export { getFullUrlController }
