'use strict';

if (!process.env.NODE_ENV) process.env.NODE_ENV = 'dev';

const env = process.env.NODE_ENV;

console.log(`Node environment: ${env}`);
console.log(`loading config.${env}.json`);

module.exports = require(`./config.${env}.json`);
