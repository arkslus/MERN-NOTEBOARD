// require rate limit from upstash
const { Ratelimit } = require("@upstash/ratelimit");
// require redis from upstash
const { Redis } = require("@upstash/redis");
// load environment variables
require("dotenv").config();

// create a rate limiter that allows 10 request
const ratelimit = new Ratelimit({
  // get the rate limit from the environment variable
  redis: Redis.fromEnv(),
  limiter: Ratelimit.slidingWindow(100, "60 s"), // 100 requests per 60 seconds
});

// export the rate limiter as a module for use in other files
module.exports = ratelimit;
