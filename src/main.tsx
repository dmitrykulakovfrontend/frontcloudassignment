import React from "react";
import ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import Layout from "./components/Layout";
import Index from "./routes";
import Form from "./routes/create";
import {
  createGlobalStyle,
  DefaultTheme,
  ThemeProvider,
} from "styled-components";

const theme: DefaultTheme = {
  borderRadius: {
    small: "4px",
    medium: "12px",
    large: "24px",
  },
  font: {
    size: {
      extraSmall: "0.75rem",
      small: "0.875rem",
      normal: "1rem",
      large: "1.25rem",
    },
  },
  colors: {
    primary: "rgb(255,255,255)",
    secondary: "rgba(85, 88, 250, 1)",
    text: {
      primary: "rgba(51, 51, 51, 1)",
      placeholder: "rgba(0, 0, 0, 0.48)",
    },
    background: "rgba(0, 0, 0, 0.04)",
    border: {
      light: "rgba(0, 0, 0, 0.08)",
      medium: "rgba(0, 0, 0, 0.16)",
      dark: "rgba(0, 0, 0, 0.32)",
    },
  },
  margin: {
    small: "8px",
    medium: "24px",
    large: "48px",
    largest: "96px",
  },
};
export const GlobalStyle = createGlobalStyle`
  @font-face {
    font-family: "SB Sans Interface";
    src: url("//db.onlinewebfonts.com/t/37086b994764dba84b2ee0f1083bfeed.eot");
    src: url("//db.onlinewebfonts.com/t/37086b994764dba84b2ee0f1083bfeed.eot?#iefix") format("embedded-opentype"), url("//db.onlinewebfonts.com/t/37086b994764dba84b2ee0f1083bfeed.woff2") format("woff2"), url("//db.onlinewebfonts.com/t/37086b994764dba84b2ee0f1083bfeed.woff") format("woff"), url("//db.onlinewebfonts.com/t/37086b994764dba84b2ee0f1083bfeed.ttf") format("truetype"), url("//db.onlinewebfonts.com/t/37086b994764dba84b2ee0f1083bfeed.svg#SB Sans Interface") format("svg");
  }
  html,body, #root {
    height: 100%;
  }
  body {
    font-family: "SB Sans Interface", sans-serif;
    background-color: ${theme.colors.background};
    color: ${theme.colors.text.primary};
    padding: 12px;
  }
  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }
`;
const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />}>
      <Route index element={<Index />} />
      <Route path="create" element={<Form />} />
    </Route>
  )
);
ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <RouterProvider router={router} />
    </ThemeProvider>
  </React.StrictMode>
);

