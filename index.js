const getBattleLog = require('./components/Battle').default;
const representBattle = require('./components/Representation').default;
const Hero = require('./components/Hero').default;

const battleLog = getBattleLog(new Hero("Muhammad Ali"), new Hero("Mike Tyson"));

representBattle(battleLog);