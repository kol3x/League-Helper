import { useEffect, useState } from "react";
import "./matches.css";
import SingleMatch from "./singleMatch";
import Loading from "./Loading";

const SERVERURL = process.env.REACT_APP_SERVERURL;

function Matches({ summonerName, setSummonerName, region }) {
  const [matches, setMatches] = useState(undefined);

  useEffect(() => {
    setMatches(undefined);
    const url = `${SERVERURL}${summonerName}/${region}/matches`;

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
