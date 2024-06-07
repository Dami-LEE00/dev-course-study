import "sanitize.css";
import { createGlobalStyle } from "styled-components";
import { ThemeName } from "./theme";

interface Props {
  themeName: ThemeName
}

export const GlobalStyle = createGlobalStyle<Props>`
  * { 
    /* margin: 0;
    padding: 0; */
    box-sizing: border-box;
    color: ${(props) => props.themeName === 'light' ? 'black' : 'white'};
  }

  body {
    margin: 0;
    padding: 0;
    background-color: ${(props) => props.themeName === 'light' ? 'white' : 'black'};
  }

  ol ul, li {
    list-style: none;
  }

  h1 {
    margin: 0;
  }
`;