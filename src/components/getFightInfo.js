'use strict';

const Roll = require('../../../roll').default;
const { getSortedFightersByInitiativeRoll, attackDamage } = require('./Fight.helper');

// for annotation and linting purposes
const Fighter = require('./Fighter').default;

/**
 * Emulates an attack phase and return a fightLogEntry with phase === 'FIGHT' or 'FIGHT_ENDED'
 * @param {Fighter} fighter1 
 * @param {Fighter} fighter2
 * @returns {Object} fightLogEntry with enough information to represent this attacks phase
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
 * Create and returns a fightLog for the Given Input Fighters.
 * @param {fighter1} fighter1 The first fighter.
 * @param {fighter1} fighter2 The second fighter.
 * @returns {Object} fightInfo fightLog with fightLogEntries which represent every step of the fight.
 * @returns {fightInfo.fighter1ID: string} first fighter's name.
 * @returns {fightInfo.fighter1StartingHP: number} first fighter's starting HP.
 * @returns {fightInfo.fighter2ID: string} second fighter's name.
 * @returns {fightInfo.fighter2StartingHP: number} second fighter's starting HP.
 * @returns {fightInfo.fightLog: Object[]} fightLog events array in chronological order.
 * 
 */
const getFightInfo = (fighter1, fighter2) => {
  const fightInfo = {
    fighter1ID: fighter1.ID(),
    fighter1StartingHP: fighter1.HP(),
    fighter2ID: fighter1.ID(),
    fighter2StartingHP: fighter1.HP(),
    fightLog: [],
  }

  let eventIDCounter = 0;

  do {
    fightInfo.fightLog.push({eventID: ++eventIDCounter, ...getAttackPhaseResult(fighter1,fighter2)});
  } while (fighter1.HP() > 0 && fighter2.HP() > 0)

  return fightInfo;
}
// #endregion Experimental

exports.default = getFightInfo;