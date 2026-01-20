import IOredis from 'ioredis';
import Redlock from 'redlock';
import { InternalServerError } from '../utils/errors/app.error';
const {serverConfig} = require('.');
function connectToRedis(){
    try {
            let redisConnection :any;
        return ()=>{
            if (!redisConnection){
                redisConnection=new IOredis(serverConfig.REDIS_SERVER_URL);
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
export const redlock = new Redlock([getRedisClient()],{
    driftFactor: 0.01,
    retryCount:  1,
    retryDelay:  200,
    retryJitter:  200,
});