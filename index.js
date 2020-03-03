const getBattleLog = require('./components/getBattleLog').default;
const representBattle = require('./components/Representation').default;
const Fighter = require('./components/Fighter').default;

const battleLog = getBattleLog(new Fighter("Muhammad Ali"), new Fighter("Mike Tyson"));
representBattle(battleLog);