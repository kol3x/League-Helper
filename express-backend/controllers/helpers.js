exports.match_history = async function (matches, userId, api, region) {
  const matchPromises = matches.map(async (matchId) => {
    try {
      const match = await api.MatchV5.get(matchId, region);
      return match.response;
    } catch (error) {
      throw error;
    }
  });
  try {
    const matchResults = await Promise.all(matchPromises);
    let result = [];
    for (let match of matchResults) {
      try {
        const userIndex = match.metadata.participants.findIndex(
          (id) => id === userId
        );
        const userInfo = match.info.participants[userIndex];

        const gameResult = userInfo.win ? "WIN" : "LOSE";

        let ourTeam = [];
        let enemyTeam = [];
        for (let i = 0; i < 10; i++) {
          // based on every player win state, determine who belongs to which team
          let playerInfo = match.info.participants[i];
          if (playerInfo === userInfo) continue; // skip the user
          if (playerInfo.win === userInfo.win) {
            ourTeam.push({ teammateInfo: playerInfo });
          } else {
            enemyTeam.push({ enemyInfo: playerInfo });
          }
        }

        let surrender =
          userInfo.gameEndedInEarlySurrender || userInfo.gameEndedInSurrender;

        let achievementsList = {
          mostDamageTaken: ach_damageTaken(userInfo, ourTeam),
          mostDamageDealt: ach_damageDealt(userInfo, ourTeam),
        };

        // Determine game length if available.
        let gameLength = 0;
        try {
          gameLength = Math.round(userInfo.challenges.gameLength / 60);
        } catch {
          console.error("Error calculating game length:");
        }

        result.push({
          gameResult: gameResult,
          info: userInfo,
          teammateList: ourTeam,
          enemyList: enemyTeam,
          achievements: achievementsList,
          surrender: surrender,
          gameLength: gameLength,
        });
      } catch (error) {
        console.error("Error processing match:", error.message);
      }
    }

    return result;
  } catch (error) {
    console.error("Error fetching match details:", error.message);
    throw error;
  }
};

function ach_damageTaken(userInfo, ourTeam) {
  let damageTakenList = [];
  try {
    for (let teammate of ourTeam) {
      damageTakenList.push(
        teammate.teammateInfo.challenges.damageTakenOnTeamPercentage
      );
    }
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
  let damageDealtList = [];
  try {
    for (let teammate of ourTeam) {
      damageDealtList.push(
        teammate.teammateInfo.challenges.teamDamagePercentage
      );
    }
    return (
      userInfo.challenges.teamDamagePercentage > Math.max(...damageDealtList)
    );
  } catch (error) {
    console.error("Error calculating damage dealt achievement:", error.message);
    return false;
  }
}
