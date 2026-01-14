import IOredis from 'ioredis';
import Redlock from 'redlock';
const {serverConfig} = require('.');

export const redisClient =new IOredis(serverConfig.REDIS_SERVER_URL);
export const redlock = new Redlock([redisClient],{
    driftFactor: 0.01,
    retryCount:  1,
    retryDelay:  200,
    retryJitter:  200,
});