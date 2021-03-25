import React, { useState } from 'react'
import axios from 'axios'
import {
  StyledForm,
  StyledInput,
  StyledButton,
} from './styled'


function AddUrlForm(): JSX.Element {
  const [url, setUrl] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)
  const [shortUrl, setShortUrl] = useState(null)

  function onUrlChange(event: React.ChangeEvent<HTMLInputElement>): void {
    setUrl(event.target.value)
  }

  async function onFormSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()

    setIsLoading(true)
    setError(null)

    // TODO setError if not valid url

    try {
      const { data } = await axios.post('/api/add-url', { url })
      
      setShortUrl(data.shortUrl)
      setIsLoading(false)
    } catch (error) {
      setError(error)
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
