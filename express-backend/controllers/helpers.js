const { Constants } = require("twisted");

exports.match_history = async function (matches, userId, api) {
  const matchPromises = matches.map(async (matchId) => {
    const match = (
      await api.MatchV5.get(matchId, Constants.RegionGroups.EUROPE)
    ).response;
    return match;
  });

  const matchResults = await Promise.all(matchPromises);

  let result = [];
  for (let match of matchResults) {
    let userIndex = -1;
    for (let i = 0; i < 10; i++) {
      if (match.metadata.participants[i] == userId) {
        userIndex = i;
        break;
      }
    }
    let userInfo = match.info.participants[userIndex];

    const gameResult = userInfo.win ? "WIN" : "LOSE";

    let ourTeam = [];
    let enemyTeam = [];
    for (let i = 0; i < 10; i++) {
      let playerInfo = match.info.participants[i];
      if (match.metadata.participants[i] === userId) continue;
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
    let gameLength = 0;
    try {
      gameLength = Math.round(userInfo.challenges.gameLength / 60);
    } catch {}

    result.push({
      gameResult: gameResult,
      info: userInfo,
      teammateList: ourTeam,
      enemyList: enemyTeam,
      achievements: achievementsList,
      surrender: surrender,
      gameLength: gameLength,
    });
  }

  return result;
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
  } catch {
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
    return false;
  }
}
