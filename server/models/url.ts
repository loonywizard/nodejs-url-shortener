import { model, Schema, Document } from 'mongoose'


interface IUrl extends Document {
  shortUrl: string,
  fullUrl: string,
}

const UrlSchema = new Schema<IUrl>({
  shortUrl: { type: String, required: true },
  fullUrl: { type: String, required: true },
}) 

const UrlModel = model<IUrl>('url', UrlSchema)

export { IUrl, UrlModel }
