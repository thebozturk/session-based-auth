const redis = require("redis");
const redisClient = redis.createClient({ host: "127.0.0.1", port: 6379 });

redisClient.on("connect", () => {
  console.log("Redis client connected");
});
module.exports = redisClient;
