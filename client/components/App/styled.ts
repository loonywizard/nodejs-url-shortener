import { createGlobalStyle } from 'styled-components'

const GlobalStyle = createGlobalStyle`
  html, body {
    padding: 0;
    margin: 0;
  }

  * {
    box-sizing: border-box;
    font-family: sans-serif;
  }
`

export { GlobalStyle }
