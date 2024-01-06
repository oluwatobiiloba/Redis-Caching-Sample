require('dotenv').config();
const { createClient } = require('redis');

const client = createClient({
    password: process.env.REDIS_PASSWORD,
    socket: {
        host: 'redis-10309.c268.eu-west-1-2.ec2.cloud.redislabs.com',
        port: 10309
    }
});

module.exports = client;