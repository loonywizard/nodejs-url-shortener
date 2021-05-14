import { Request, Response } from 'express'
import { nanoid } from 'nanoid'
import { IUrl, UrlModel } from '../models/url'
import { isValidUrl } from '../../common/validationRules/isValidUrl'


async function addUrlController(req: Request, res: Response) {
  try {    
    // better exceptions
    if (!isValidUrl(req.body.url)) throw new Error('invalid url')

    const existingUrl: IUrl | null = await UrlModel.findOne({ fullUrl: req.body.url }).exec()

    if (existingUrl !== null) return res.send({ shortUrl: existingUrl.shortUrl })
    
    // TODO: refactor without let
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
}

export { addUrlController }
