import { useState } from "react";
import "./search.css";

function Search({ summonerName, setSummonerName, region, setRegion }) {
  const [summonerInput, setSummonerInput] = useState("");
  const regions = [
    "BRAZIL",
    "EU_EAST",
    "EU_WEST",
    "KOREA",
    "LAT_NORTH",
    "LAT_SOUTH",
    "AMERICA_NORTH",
    "OCEANIA",
    "TURKEY",
    "RUSSIA",
    "JAPAN",
  ];
  return (
    <div className="searchBox">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          setSummonerName(e.target.summonerNameInput.value);
          setSummonerInput("");
          setRegion(e.target.serverSelect.value);
        }}
      >
        <label htmlFor="summonerNameInput">
          Summoner name:
          <input
            type="text"
            name="summonerNameInput"
            placeholder={summonerName}
            value={summonerInput}
            onChange={(e) => {
              setSummonerInput(e.target.value);
            }}
          ></input>
        </label>
        <label htmlFor="serverSelect">
          Server:
          <select name="serverSelect">
            {regions.map((reg) => (
              <option key={reg} value={reg} selected={reg === region}>
                {reg}
              </option>
            ))}
          </select>
        </label>
        <button type="submit">whoop</button>
      </form>
    </div>
  );
}

export default Search;
