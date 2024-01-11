import { useState } from "react";
import "./App.css";
import Matches from "./matches";
import Search from "./searchBox";
import Warning from "./warning";
import Error from "./error";

function App() {
  const [region, setRegion] = useState("EU_WEST");
  const [summonerName, setSummonerName] = useState("PunkTeenager");
  const [error, setError] = useState(false);
  return (
    <>
      <Search summonerName={summonerName} setSummonerName={setSummonerName} region={region} setRegion={setRegion}/>
      {error ? <Error /> : ""}
      <Warning />
      <Matches summonerName={summonerName} setSummonerName={setSummonerName} region={region} setError={setError} error={error}/>
    </>
  );
}

export default App;
