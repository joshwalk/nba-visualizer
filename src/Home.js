import React from "react"
import { Link } from "react-router-dom"
import logo from "./logo2.png"

const Home = () => {
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
      <div style={{ textAlign: "center", marginTop: 100 }}>
        <Link to="/aging-like-wine">
          <h1 style={{ fontSize: 58, lineHeight: 1.1, cursor: "pointer" }}>
            Aging Like Wine &#8594;
          </h1>
        </Link>

        <Link to="/magic-over-the-years">
          <h1 className="magic" style={{ cursor: "pointer" }}>
            Magic Over the Years &#8594;
          </h1>
        </Link>
      </div>
    </div>
  )
}

export default Home