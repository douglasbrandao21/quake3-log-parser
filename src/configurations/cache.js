// const { get } = require("express/lib/response");
// const Redis = require("ioredis");

// class CacheManager {
//     constructor() {
//         this.redis = new Redis({
//             host: "localhost",
//             port: "6379"
//         });
//     }

//     async getKey(key) {
//         const value = await this.redis.get(key);

//         return value ? JSON.parse(value) : null;
//     }

//     setKey(key, value, expirationTime) {
//         this.redis(key, JSON.stringify(value), "EX", expirationTime);
//     }
// }
