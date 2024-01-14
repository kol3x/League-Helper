import { useState } from "react";
import "./App.css";
import Matches from "./matches";
import Search from "./searchBox";
import Warning from "./warning";
import Error from "./error";

function App() {
  const [region, setRegion] = useState("EU_WEST");
  const [summonerName, setSummonerName] = useState("PunkTeenager");
  const [tagLine, setTagLine] = useState("EUW");
  const [error, setError] = useState(false);
  return (
    <>
      <Search
        setSummonerName={setSummonerName}
        region={region}
        setRegion={setRegion}
        setTagLine={setTagLine}
      />
      {error ? <Error /> : ""}
      {/* <Warning /> */}
      <Matches
        summonerName={summonerName}
        setSummonerName={setSummonerName}
        region={region}
        setError={setError}
        error={error}
        tagLine={tagLine}
        setTagLine={setTagLine}
      />
    </>
  );
}

export default App;
