import React from "react"
import ReactDOM from "react-dom"
import { HashRouter, Route } from "react-router-dom"
import "./index.css"
import App from "./App"
import reportWebVitals from "./reportWebVitals"
import AgingLikeWine from "./aging-like-wine/AgingLikeWine"
import MagicBySeason from "./magic-by-season/MagicBySeason"

ReactDOM.render(
  <React.StrictMode>
    <HashRouter>
      <Route exact path="/">
        <App />
      </Route>
      <Route path="/aging-like-wine">
        <AgingLikeWine />
      </Route>
      <Route path="/magic-over-the-years">
        <MagicBySeason />
      </Route>
    </HashRouter>
  </React.StrictMode>,
  document.getElementById("root")
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
