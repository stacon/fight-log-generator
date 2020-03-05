'use strict';

const getFightInfo = require('./src/components/getFightInfo').default;
const Fighter = require('./src/components/Fighter').default;

const fightInfo = getFightInfo(Fighter(), Fighter());

module.exports = fightInfo;
