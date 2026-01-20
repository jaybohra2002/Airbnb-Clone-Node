import Redis from "ioredis";
import { serverConfig } from ".";
import { InternalServerError } from "../utils/errors/app.error";
//singleton function for redis connection, we can classes too for the same
function connectToRedis(){
    try {
            let redisConnection :any;
            const redisConfig={
            port:serverConfig.REDIS_PORT,
            host:serverConfig.REDIS_HOST,
            maxRetriesPerRequest:null
        }
        return ()=>{
            if (!redisConnection){
                redisConnection=new Redis(redisConfig);
                return redisConnection;
            }
            return redisConnection;
        }
    } catch (error) {
        console.error("Error connecting to Redis:", error);
        throw new InternalServerError("Could not connect to Redis");
    }
        

};
export const getRedisClient=connectToRedis();