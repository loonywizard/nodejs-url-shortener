import 'normalize.css'
import React from 'react'
import { AddUrlForm } from '../AddUrlForm'
import { StyledContainer, GlobalStyle } from './styled'


function App() {
  return (
    <StyledContainer>
      <AddUrlForm />
    </StyledContainer>
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
