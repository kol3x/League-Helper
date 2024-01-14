function SingleMatch({ match, setSummonerName, setTagLine }) {
  let styles;
  const gradientWin =
    "linear-gradient(0deg, hsl(0deg 0% 100%) 0%, hsl(300deg 100% 100%) 25%, hsl(300deg 100% 100%) 50%, hsl(135deg 100% 96%) 75%, hsl(139deg 100% 81%) 100%), rgba(159, 255, 189, 0.46)";

  const gradientLose =
    "linear-gradient(0deg, hsl(0deg 0% 100%) 0%, hsl(300deg 100% 100%) 25%, hsl(300deg 100% 100%) 50%, hsl(13deg 100% 95%) 75%, hsl(12deg 100% 79%) 100%)";

  if (match.gameResult === "WIN") {
    styles = {
      background: gradientWin,
    };
  } else {
    styles = {
      background: gradientLose,
    };
  }

  return (
    <div key={match.info.gameId} className="singleMatch">
      <div className="mainChamp" style={styles}>
        <img
          className="mainChampPic"
          src={`https://opgg-static.akamaized.net/meta/images/lol/champion/${
            match.info.championName == "FiddleSticks"
              ? "Fiddlesticks"
              : match.info.championName
          }.png`}
          alt={match.info.championName}
        ></img>
        <h1>{match.info.championName}</h1>
        <h3 className="mainChampKda">
          {`K: ${match.info.kills} D: ${match.info.deaths} A: ${match.info.assists}`}
        </h3>
        <div className="teammates">
          {match.teammateList.map((teammate) => (
            <div key={teammate.puuid} className="singleTeammate">
              <img
                className="champPic"
                src={`https://opgg-static.akamaized.net/meta/images/lol/champion/${
                  teammate.teammateInfo.championName === "FiddleSticks"
                    ? "Fiddlesticks"
                    : teammate.teammateInfo.championName
                }.png`}
                alt={teammate.teammateInfo.championName}
              ></img>
              <div
                className="teammateName"
                onClick={() => {
                  setSummonerName(teammate.teammateInfo.riotIdGameName);
                  setTagLine(teammate.teammateInfo.riotIdTagline);
                }}
              >{`${teammate.teammateInfo.riotIdGameName} #${teammate.teammateInfo.riotIdTagline}`}</div>
            </div>
          ))}
        </div>
      </div>
      <h2 className="gameLength">{`${match.gameLength} minutes`}</h2>
      <div className="enemys">
        <h1>Enemy Team</h1>
        {match.enemyList.map((enemy) => (
          <div key={enemy.puuid} className="singleEnemy">
            <img
              className="champPic"
              src={`https://opgg-static.akamaized.net/meta/images/lol/champion/${
                enemy.enemyInfo.championName == "FiddleSticks"
                  ? "Fiddlesticks"
                  : enemy.enemyInfo.championName
              }.png`}
              alt={enemy.enemyInfo.championName}
            ></img>
            <div
              className="enemyName"
              onClick={() => {
                setSummonerName(enemy.enemyInfo.riotIdGameName);
                setTagLine(enemy.enemyInfo.riotIdTagline);
              }}
            >{`${enemy.enemyInfo.riotIdGameName} #${enemy.enemyInfo.riotIdTagline}`}</div>
          </div>
        ))}
      </div>

      <div className="funFacts">
        {match.achievements.mostDamageDealt === true && (
          <li className="green">You've dealt the most damage!</li>
        )}
        {match.achievements.mostDamageTaken === true && (
          <li className="yellow">
            You took the most damage! Good tanking! Unless...
          </li>
        )}
        {match.info.challenges === undefined ? (
          ""
        ) : (
          <li className="green">
            {`Dodged ${match.info.challenges["skillshotsDodged"]} skillshots.`}
          </li>
        )}
        <li className="green">{`You CCed enemies for ${match.info.timeCCingOthers} seconds`}</li>
        {match.surrender === true && (
          <li className="red">The game ended in forfeit!</li>
        )}
        <li className="yellow">
          {`In this game, you were dead for ${match.info.totalTimeSpentDead} seconds.`}
        </li>
      </div>
    </div>
  );
}

export default SingleMatch;
