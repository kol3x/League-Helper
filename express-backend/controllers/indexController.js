const asyncHandler = require("express-async-handler");
const { LolApi, Constants, regionToRegionGroup } = require("twisted");
const { RIOT, REDIS_URL } = require("../config/index");
const { match_history } = require("./helpers");
const Redis = require("redis");

const redisClient = Redis.createClient({
  url: REDIS_URL,
  legacyMode: true,
});
(async () => {
  await redisClient.connect();
})();
const EXPIRATION = 1200;

const api = new LolApi({
  rateLimitRetry: true,
  rateLimitRetryAttempts: 1,
  concurrency: undefined,
  key: RIOT,
  debug: {
    logTime: false,
    logUrls: false,
    logRatelimit: false,
  },
});

exports.user_matches = asyncHandler(async (req, res, next) => {
  const summonerName = req.params.user;
  const region = req.params.server;
  redisClient.get(
    `:user_${summonerName}:server_${region}`,
    async (error, data) => {
      if (error || data == null) {
        try {
          const summoner = (
            await api.Summoner.getByName(
              summonerName,
              Constants.Regions[region]
            )
          ).response;
          const group = Constants.regionToRegionGroup(
            Constants.Regions[region]
          );
          const matchlist = (
            await api.MatchV5.list(
              summoner.puuid,
              Constants.RegionGroups[group]
            )
          ).response.slice(0, 10);
          const dataAPI = JSON.stringify(
            await match_history(matchlist, summoner.puuid, api, group)
          );
          redisClient.setEx(
            `:user_${summonerName}:server_${region}`,
            EXPIRATION,
            dataAPI
          );
          res.send(`${dataAPI}`);
        } catch {
          res.sendStatus(404);
        }
      } else {
        return res.json(JSON.parse(data));
      }
    }
  );
});
