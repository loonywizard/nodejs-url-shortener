import React, { useState } from 'react'
import axios from 'axios'
import { isValidUrl } from '../../../common/validationRules/isValidUrl'
import {
  StyledForm,
  StyledInput,
  StyledButton,
} from './styled'


function AddUrlForm(): JSX.Element {
  const [url, setUrl] = useState<string>('')
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)
  const [shortUrl, setShortUrl] = useState<string | null>(null)

  function onUrlChange(event: React.ChangeEvent<HTMLInputElement>): void {
    setUrl(event.target.value)
  }

  async function onFormSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()

    if (!isValidUrl(url)) return setError('invalid url')

    setIsLoading(true)
    setError(null)

    try {
      const { data } = await axios.post('/api/add-url', { url })

      setShortUrl(data.shortUrl)
      setIsLoading(false)
    } catch (error) {
      setError(error.response.data)
    }
  }

  return (
    <StyledForm onSubmit={onFormSubmit}>
      <StyledInput value={url} onChange={onUrlChange} disabled={isLoading} />

      <StyledButton type="submit" disabled={isLoading}>Submit url</StyledButton>

      {shortUrl && <div>Short url: {shortUrl}</div>}
      {error && <div>Error: {error}</div>}
    </StyledForm>
  )
}

export { AddUrlForm }
