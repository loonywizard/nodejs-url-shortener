import styled, { createGlobalStyle } from 'styled-components'

const GlobalStyle = createGlobalStyle`
  html, body {
    padding: 0;
    margin: 0;
    height: 100%;
  }

  #app {
    height: 100%;
  }

  * {
    box-sizing: border-box;
    font-family: sans-serif;
  }
`

const StyledContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  padding: 10px;
`

export { StyledContainer, GlobalStyle }
