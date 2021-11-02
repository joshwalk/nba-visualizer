import "./App.css"
import { JJLineChart } from "./JJLineChart"
import JJ from "./jj3.jpg"
import { AgeScatterChart } from "./AgeScatterChart"
import MagicBySeason from "./magic-by-season/MagicBySeason"
import ParentSize from "@visx/responsive/lib/components/ParentSize"

function App({ post }) {
  return post === "Aging Like Wine" ? (
    <div className="App">
      <header className="App-header">
        <h1>Aging Like Wine</h1>
        <h2>An Analysis of NBA Players' Peak PPG Seasons</h2>
        <img
          src={JJ}
          alt="JJ Redick"
          style={{ width: 750, marginTop: "2em" }}
        />
      </header>
      <div className="text-body">
        <p>
          Since being drafted by the Magic in 2006, JJ Redick's career has taken
          an interesting trajectory. While he struggled in his early years in
          the league, he found his stride on the Clippers and really started
          taking off on the Sixers. While many players start to drop off in
          their 30s, JJ continued to increase his points per game. Impressively,
          he recorded a career-best 18.1 points per game{" "}
          <em>at the age of 34.</em>
        </p>
      </div>
      <h2>JJ Redick Career PPG by Age</h2>
      <div className="content">
        <JJLineChart />
      </div>
      <div className="text-body">
        <p>
          This got me thinking-- has this <em>ever</em> happened in NBA history?
          Armed with a giant dataset of every NBA player's statistics by season
          since 1950, I set out to discover if anyone could top Redick's
          acheivement. Filtering for seasons where a player played more than 10
          games and more than 15 points per game, here's what I found. Hover
          over any data point on the graph to see the corresponding player and
          details.
        </p>
      </div>
      <h2>Career-High PPG Seasons by Player Age</h2>
      <div className="content" style={{ marginBottom: "2em" }}>
        <AgeScatterChart />
      </div>

      <div className="text-body">
        <p>
          Somewhat surprisingly, JJ is not alone. Looks like Sam Cassell also
          had his peak PPG season at age 34. But wait... where are these ages
          coming from? I dug deeper and discovered that the dataset I used
          calculates it based on the age that player was on February 1st of the
          season.
        </p>
        <p>
          Alright, so let's get techincal (maybe a little too much) and break
          the tie. Here's the precise age of each player on February 1st of
          their career-high season:
        </p>
        <ul>
          <li>
            <strong>
              JJ Redick: <em>34 years, 7 months, 27 days</em>
            </strong>{" "}
            🎉
          </li>
          <li>
            Sam Cassell: <em>34 years, 2 months, 13 days</em>
          </li>
        </ul>
        <p>
          Hypothesis confirmed! Redick is officially the oldest NBA player to
          record a personal-best season PPG.
        </p>
        <p style={{ color: "lightgray" }}>
          <em>All data sourced from Basketball Reference</em>
        </p>
      </div>
    </div>
  ) : (
    <ParentSize>
      {({ height, width }) => <MagicBySeason height={height} width={width} />}
    </ParentSize>
  )
}

export default App
