import "./App.css"
import { JJLineChart } from "./JJLineChart"
import JJ from "./jj3.jpg"
import { AgeScatterChart } from "./AgeScatterChart"

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Aging Like Wine</h1>
        <h2>An Analysis of NBA Players' Peak PPG Seasons</h2>
        <img
          src={JJ}
          alt="JJ Redick"
          style={{ width: 750, marginTop: "2em" }}
        />
        <div className="text-body">
          <p>
            Since being drafted by the Magic in 2006, JJ Redick's career has
            taken an interesting trajectory. While he struggled in his early
            years in the league, he found his stride on the Clippers and really
            started taking off on the Sixers. While many players start to drop
            off in their 30s, JJ continued to increase his points per game.
            Impressively, he recorded a career-best 18.1 points per game{" "}
            <em>at the age of 35.</em>
          </p>
        </div>
      </header>
      <h2>JJ Redick Career PPG by Age</h2>
      <div className="content">
        <JJLineChart />
      </div>
      <div className="text-body">
        <p>
          This got me thinking-- has this <em>ever</em> happened in NBA history?
          Armed with a giant dataset of every NBA player's statistics by season
          since 1950, I set out to discover if it was true. Filtering for
          seasons where a player played more than 10 games and more than 15
          points per game, here's what I found. Hover over any data point on the
          graph to see the corresponding player and details.
        </p>
      </div>
      <h2>Career-High PPG Seasons by Player Age</h2>
      <div className="content" style={{ marginBottom: "2em" }}>
        <AgeScatterChart />
      </div>

      <div className="text-body">
        <p>
          Indeed, JJ Redick came out on top. Right behind him were Sam Cassell
          (34) and Chauncey Billips (33).
        </p>
      </div>
    </div>
  )
}

export default App
