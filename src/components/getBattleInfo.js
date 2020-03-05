'use strict';

const Roll = require('../../../Roll/Roll');
const { getSortedFightersByInitiativeRoll, attackDamage } = require('./Battle.helper');

// for annotation and linting purposes
const Fighter = require('./Fighter').default;

/**
 * Emulates an attack phase and return a battleLogEntry with phase === 'FIGHT' or 'FIGHT_ENDED'
 * @param {Fighter} fighter1 
 * @param {Fighter} fighter2
 * @returns {Object} battleLogEntry with enough information to represent this attacks phase
 */
const getAttackPhaseResult = (fighter1, fighter2) => {

  // Returns an array after fighters initiative rolls. Highest roll becomes the first attacker and it references the initial Fighter Object
  const [attacker, defender] = getSortedFightersByInitiativeRoll(fighter1, fighter2);

  const attackPhaseResult = {
    phase: 'FIGHT',
    attackerID: attacker.ID(),
    attackerHP: attacker.HP(),
    defenderID: defender.ID(),
    defenderHP: defender.HP(),
    inflictedDamage: 0,
    hitResult: 'NORMAL'
  };

  const attackRoll = Roll.d(20);
  const isCritical = attackRoll > 18;

  if (isCritical) {
    attackPhaseResult.hitResult = 'CRITICAL';
  }

  const attackRollSucceeded = (attackRoll + attacker.attackRollBonus() - defender.AC()) > 0;
  const inflictedDamage = attackDamage(attacker) * (isCritical ? 2 : 1); // Critical inficts double Damage
  const totalInfictedDamage = inflictedDamage - defender.damageReduction();

  if ((attackRollSucceeded || isCritical) && totalInfictedDamage > 0) {
    const lifeLeftAfterHit = defender.HP() - totalInfictedDamage;
    attackPhaseResult.defenderHP = defender.HP(lifeLeftAfterHit);

    attackPhaseResult.inflictedDamage = totalInfictedDamage;
  }  

  if (totalInfictedDamage < 1) {
    attackPhaseResult.hitResult = 'BLOCKED';
  } else if (!attackRollSucceeded) {
    attackPhaseResult.hitResult = 'DODGED';;
  }

  if (attacker.HP() < 1 || defender.HP() < 1) {
    attackPhaseResult.phase = 'FIGHT_ENDED';
  }

  return attackPhaseResult;
}
/**
 * Create and returns a battleLog for the Given Input Fighters.
 * @param {fighter1} fighter1 The first fighter.
 * @param {fighter1} fighter2 The second fighter.
 * @returns {Object} battleInfo battleLog with battleLogEntries which represent every step of the fight.
 * @returns {battleInfo.fighter1ID: string} first fighter's name.
 * @returns {battleInfo.fighter1StartingHP: number} first fighter's starting HP.
 * @returns {battleInfo.fighter2ID: string} second fighter's name.
 * @returns {battleInfo.fighter2StartingHP: number} second fighter's starting HP.
 * @returns {battleInfo.battleLog: Object[]} battleLog events array in chronological order.
 * 
 */
const getBattleInfo = (fighter1, fighter2) => {
  const battleInfo = {
    fighter1ID: fighter1.ID(),
    fighter1StartingHP: fighter1.HP(),
    fighter2ID: fighter1.ID(),
    fighter2StartingHP: fighter1.HP(),
    battleLog: [],
  }

  let eventIDCounter = 0;

  do {
    battleInfo.battleLog.push({eventID: ++eventIDCounter, ...getAttackPhaseResult(fighter1,fighter2)});
  } while (fighter1.HP() > 0 && fighter2.HP() > 0)

  return battleInfo;
}
// #endregion Experimental

exports.default = getBattleInfo;