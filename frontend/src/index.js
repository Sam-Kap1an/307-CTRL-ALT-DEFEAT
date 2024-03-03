import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import "crypto-browserify";
import "util";
import "stream-browserify";

const root = ReactDOM.createRoot(document.getElementById("root"));

const theme = extendTheme({
  colors: {
    darkBlue: "#123C69",
  },
  styles: {
    global: (props) => ({
      body: {
        bg: "",
      },
    }),
  },
});

root.render(
  <ChakraProvider theme={theme}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </ChakraProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
