import React from "react"
import ReactDOM from "react-dom"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import "./index.css"
import App from "./App"
import Home from "./Home"
import reportWebVitals from "./reportWebVitals"
import AgingLikeWine from "./AgingLikeWine"
import MagicBySeason from "./magic-by-season/MagicBySeason"

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/nba-visualizer" element={<App />} />
        <Route
          path="/nba-visualizer/aging-like-wine"
          element={<AgingLikeWine />}
        />
        <Route
          path="/nba-visualizer/magic-over-the-years"
          element={<MagicBySeason />}
        />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
