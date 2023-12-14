import { useEffect, useState } from "react";
import "./matches.css";
import SingleMatch from "./singleMatch";
import Loading from "./Loading";

const SERVER_URL = process.env.SERVER_URL;

function Matches({ summonerName, setSummonerName, region }) {
  const [matches, setMatches] = useState(undefined);

  useEffect(() => {
    setMatches(undefined);
    const url = `${SERVER_URL}/${summonerName}/${region}/matches`;

    const fetchData = async () => {
      const response = await fetch(url);
      const matches = await response.json();
      setMatches(matches);
    };
    fetchData();
  }, [summonerName]);
  return (
    <div className="matchesContainer">
      {!matches && <Loading />}
      {matches &&
        matches.map((match) => (
          <SingleMatch match={match} setSummonerName={setSummonerName} />
        ))}
    </div>
  );
}

export default Matches;
