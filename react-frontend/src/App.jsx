import { useState } from "react";
import "./App.css";
import Matches from "./matches";
import Search from "./searchBox";

function App() {
  const [region, setRegion] = useState("EU_WEST");
  const [summonerName, setSummonerName] = useState("PunkTeenager");
  return (
    <>
      <Search summonerName={summonerName} setSummonerName={setSummonerName} region={region} setRegion={setRegion}/>
      <h1 className="summonerName">Ranked games stats of {summonerName}</h1>
      <Matches summonerName={summonerName} setSummonerName={setSummonerName} region={region}/>
    </>
  );
}

export default App;
