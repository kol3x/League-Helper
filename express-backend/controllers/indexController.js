const asyncHandler = require("express-async-handler");
const { LolApi, RiotApi, Constants } = require("twisted");
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

redisClient.on('error', err => console.log('Redis Client Error', err));

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

const riotApi = new RiotApi({
  key: RIOT,
});

exports.user_matches = asyncHandler(async (req, res, next) => {
  const summonerName = req.params.user;
  const region = req.params.server;
  let tagLine = req.params.tagline;
  if (!tagLine || tagLine === "unset") tagLine = Constants.Regions[region];
  redisClient.get(
    `:user_${summonerName}:server_${region}:tagLine_${tagLine}`,
    async (error, data) => {
      if (error || data == null) {
        try {
          const group = Constants.regionToRegionGroup(
            Constants.Regions[region]
          );
          const accountId = (
            await riotApi.Account.getByRiotId(summonerName, tagLine, group)
          ).response;
          const matchlist = (
            await api.MatchV5.list(accountId.puuid, group, { queue: 420 })
          ).response.slice(0, 10);
          const dataAPI = JSON.stringify(
            await match_history(matchlist, accountId.puuid, api, group)
          );
          redisClient.setEx(
            `:user_${summonerName}:server_${region}:tagLine_${tagLine}`,
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
