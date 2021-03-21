import { model, Schema, Document } from 'mongoose'


interface IURL extends Document {
  shortUrl: string,
  fullUrl: string,
}

const URLSchema = new Schema<IURL>({
  shortUrl: { type: String, required: true },
  fullUrl: { type: String, required: true },
}) 

const URLModel = model<IURL>('URL', URLSchema)

export { IURL, URLModel }
