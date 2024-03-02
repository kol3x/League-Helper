exports.match_history = async function (matches, userId, api, region) {
  // fetch every match in parallel
  const matchPromises = matches.map(async (matchId) => {
    try {
      const match = await api.MatchV5.get(matchId, region);
      return match.response;
    } catch (error) {
      console.error("Error fetching matches:", error.message);
      throw error;
    }
  });
  try {
    const matchResults = await Promise.all(matchPromises);
    const matches = [];
    matchResults.map((match) =>
      matches.push(processSingleMatch(match, userId))
    );

    return matches;
  } catch (error) {
    console.error("Error fetching match details:", error.message);
    throw error;
  }
};

function ach_damageTaken(userInfo, ourTeam) {
  const damageTakenList = [];
  try {
    ourTeam.map((teammate) =>
      damageTakenList.push(
        teammate.teammateInfo.challenges.damageTakenOnTeamPercentage
      )
    );
    return (
      userInfo.challenges.damageTakenOnTeamPercentage >
      Math.max(...damageTakenList)
    );
  } catch (error) {
    console.error("Error calculating damage taken achievement:", error.message);
    return false;
  }
}

function ach_damageDealt(userInfo, ourTeam) {
  const damageDealtList = [];
  try {
    ourTeam.map((teammate) =>
      damageDealtList.push(
        teammate.teammateInfo.challenges.teamDamagePercentage
      )
    );
    return (
      userInfo.challenges.teamDamagePercentage > Math.max(...damageDealtList)
    );
  } catch (error) {
    console.error("Error calculating damage dealt achievement:", error.message);
    return false;
  }
}

function processSingleMatch(match, userId) {
  try {
    const userIndex = match.metadata.participants.findIndex(
      (id) => id === userId
    );
    const userInfo = match.info.participants[userIndex];

    const gameResult = userInfo.win ? "WIN" : "LOSE";

    const [ourTeam, enemyTeam] = populateTeams(match, userInfo);

    const surrender =
      userInfo.gameEndedInEarlySurrender || userInfo.gameEndedInSurrender;

    const achievementsList = {
      mostDamageTaken: ach_damageTaken(userInfo, ourTeam),
      mostDamageDealt: ach_damageDealt(userInfo, ourTeam),
    };

    let gameLength = 0;
    try {
      gameLength = Math.round(userInfo.challenges.gameLength / 60);
    } catch {
      console.error("Error calculating game length:");
    }
    return {
      gameResult: gameResult,
      info: userInfo,
      teammateList: ourTeam,
      enemyList: enemyTeam,
      achievements: achievementsList,
      surrender: surrender,
      gameLength: gameLength,
    };
  } catch (error) {
    console.error("Error processing match:", error.message);
  }
}

function populateTeams(match, userInfo) {
  const ourTeam = [];
  const enemyTeam = [];
  match.info.participants.map((player) => {
    if (player === userInfo) return;
    if (player.win === userInfo.win) {
      ourTeam.push({ teammateInfo: player });
    } else {
      enemyTeam.push({ enemyInfo: player });
    }
  });
  return [ourTeam, enemyTeam];
}
