'use strict';

const Roll = require('../../Roll/Roll');
const { getSortedHeroesByInitiativeRoll, attackDamage } = require('./Battle.helper');

// for annotation and linting purposes
const Hero = require('./Hero').default;

/**
 * Emulates an attack phase and return a battleLogEntry with phase === 'FIGHT' or 'FIGHT_ENDED'
 * @param {Hero} attackerFighter 
 * @param {Hero} defendingFighter
 * @returns {Object} battleLogEntry with enough information to represent this attacks phase
 */
const getAttackPhaseResult = (fighterLeft, fighterRight) => {

  // Returns an array after fighters initiative rolls. Highest roll becomes the first attacker and it references the initial Hero Object
  const [attacker, defender] = getSortedHeroesByInitiativeRoll(fighterLeft, fighterRight);

  const attackPhaseResult = {
    phase: 'FIGHT',
    attackerName: attacker.name(),
    attackerHP: attacker.HP(),
    defenderName: defender.name(),
    defenderHP: defender.HP(),
    inflictedDamage: 0,
    hitResult: 'NORMAL'
  };

  const attackRoll = Roll.D(20);
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
 * @param {Hero} fighterLeft The first fighter.
 * @param {Hero} fighterRight The second fighter.
 * @returns {Object[]} battleLog with battlelogEntries which represent every step of the fight.
 */
const getBattleLog = (fighterLeft, fighterRight) => {
  const battleLog = [];
  let eventIDCounter = 0;

  battleLog.push({eventID: ++eventIDCounter , phase: 'ANNOUNCEMENT', fighterLeft, fighterRight})

  do {
    battleLog.push({eventID: ++eventIDCounter, ...getAttackPhaseResult(fighterLeft,fighterRight)});
  } while (fighterLeft.HP() > 0 && fighterRight.HP() > 0)

  return battleLog;
}
// #endregion Experimental

exports.default = getBattleLog;