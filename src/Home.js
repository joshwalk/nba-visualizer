import React from "react"
import { useNavigate } from "react-router"
import logo from "./logo2.png"

const Home = () => {
  let navigate = useNavigate()
  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          fontSize: 20,
          marginTop: 50,
          fontWeight: "200"
        }}
      >
        <img style={{ width: 100, height: 90 }} src={logo} />
        <div style={{ marginTop: 5 }}>+ 🏀</div>
      </div>
      <div style={{ textAlign: "center", marginTop: 200 }}>
        <h1
          onClick={() => navigate("/nba-visualizer/aging-like-wine")}
          style={{ fontSize: 58, lineHeight: 1.1, cursor: "pointer" }}
        >
          Aging Like Wine &#8594;
        </h1>
        <h1
          onClick={() => navigate("/nba-visualizer/magic-over-the-years")}
          className="magic"
          style={{ cursor: "pointer" }}
        >
          Magic Over the Years &#8594;
        </h1>
      </div>
    </div>
  )
}

export default Home
