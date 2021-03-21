import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { GlobalStyle } from './styled'

function App() {
  const [messageFromServer, setMessageFromServer] = useState(null)

  useEffect(() => {
    async function fetchDataFromServe() {
      try {
        const { data } = await axios.get('/api/data')
        
        setMessageFromServer(data)
      } catch (error) {
        console.error(`Error while fetching data from server: ${error}`)
      }
    }

    fetchDataFromServe()
  }, [])

  return (
    <div>
      Hello! this is React app

      <br />

      {messageFromServer && (
        <div>
          Message from server: {messageFromServer}
        </div>
      )}
    </div>
  )
}

function AppWithGlobalStyles() {
  return (
    <>
      <GlobalStyle />
      <App />
    </>
  )
}

export { AppWithGlobalStyles as App }
