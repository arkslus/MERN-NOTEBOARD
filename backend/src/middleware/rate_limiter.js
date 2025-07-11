// require the rate limiter from thh upstash file
const ratelimit = require("../config/upstash.js");

// create a rate limiter function middleware
const rateLimiter = async (req, res, next) => {
  try {
    const { success } = await ratelimit.limit("my-rate-limit");

    if (!success) {
      return res.status(429).json({
        message: "Too many requests, please try again later",
      });
    }

    next();
  } catch (error) {
    console.log("Rate limit error", error);
    next(error);
  }
};

// export the rate limiter middleware
module.exports = rateLimiter;
