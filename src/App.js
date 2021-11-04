import MagicBySeason from "./magic-by-season/MagicBySeason"
import AgingLikeWine from "./AgingLikeWine"

function App({ post }) {
  return post === "Aging Like Wine" ? <AgingLikeWine /> : <MagicBySeason />
}

export default App
