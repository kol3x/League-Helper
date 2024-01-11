import { useEffect, useState } from "react";
import "./matches.css";
import SingleMatch from "./singleMatch";
import Loading from "./Loading";

const SERVER_URL = process.env.SERVER_URL;

function Matches({ summonerName, setSummonerName, region, setError, error }) {
  const [matches, setMatches] = useState(undefined);

  useEffect(() => {
    setMatches(undefined);
    const url = `${SERVER_URL}/${summonerName}/${region}/matches`;
    const fetchData = async () => {
      try {
        const response = await fetch(url);
        if (!response.ok) {
          console.error(`Failed to fetch data. Status: ${response.status}`);
          setError(true);
          return;
        }
        const matches = await response.json();
        setError(false);
        setMatches(matches);
      } catch (error) {
        console.error("Error fetching data:", error);
        setError(true);
      }
    };

    fetchData();
  }, [summonerName, region]);

  return (
    <>
      <h1 className="summonerName">Ranked games stats of {summonerName}</h1>
      <div className="matchesContainer">
        {!matches && !error && <Loading />}
        {matches &&
          matches.map((match) => (
            <SingleMatch match={match} setSummonerName={setSummonerName} />
          ))}
      </div>
    </>
  );
}

export default Matches;
