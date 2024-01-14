import { useState } from "react";
import "./search.css";

function Search({ setSummonerName, region, setRegion, setTagLine }) {
  const [summonerInput, setSummonerInput] = useState("");
  const [tagLineInput, setTagLineInput] = useState("");
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
          setTagLine(tagLineInput);
          setRegion(e.target.serverSelect.value);
        }}
      >
        <label htmlFor="summonerNameInput">
          Summoner name:
          <input
            type="text"
            name="summonerNameInput"
            placeholder="Summoner name"
            value={summonerInput}
            onChange={(e) => {
              setSummonerInput(e.target.value);
            }}
          ></input>
        </label>
        <label htmlFor="tagLineInput">
          Tagline:
          <input
            type="text"
            name="tagLineInput"
            placeholder="#SMTH"
            value={tagLineInput}
            onChange={(e) => {
              setTagLineInput(e.target.value);
            }}
          ></input>
        </label>

        <label htmlFor="serverSelect">
          Server:
          <select name="serverSelect" defaultValue={region}>
            {regions.map((reg) => (
              <option key={reg} value={reg}>
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
