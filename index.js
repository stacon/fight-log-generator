'use strict';

const getBattleInfo = require('./src/components/getBattleInfo').default;
const representBattle = require('./src/components/Representation').default;
const Fighter = require('./src/components/Fighter').default;

const battleInfo = getBattleInfo(new Fighter(), new Fighter());

representBattle(battleInfo, {
  fighterName1: 'Mike Tyson',
  fighterName2: 'Muhammad Ali',
  timeInterval: 1000,
  withConsoleLogRefresh: true,
});