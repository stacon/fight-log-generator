'use strict';

const getBattleInfo = require('./components/getBattleInfo').default;
const representBattle = require('./components/Representation').default;
const Fighter = require('./components/Fighter').default;

const battleInfo = getBattleInfo(new Fighter(), new Fighter());

representBattle(battleInfo, {
  fighterName1: 'Mike Tyson',
  fighterName2: 'Muhammad Ali',
  timeInterval: 1000,
  withConsoleLogRefresh: true,
});