'use strict';

const Roll = require('../../Roll/Roll');
const { getSortedHeroesByInitiativeRoll, attackDamage } = require('./Battle.helper');

// #region Experimental
const getAttackPhaseResult = (attackerFighter, defendingFighter) => {
  const attackPhaseResult = {
    phase: 'FIGHT',
    attackerName: attackerFighter.name(),
    attackerHP: attackerFighter.HP(),
    defenderName: defendingFighter.name(),
    defenderHP: defendingFighter.HP(),
    inflictedDamage: 0,
    hitResult: 'NORMAL'
  };

  const attackRoll = Roll.D(20);
  const isCritical = attackRoll > 18;

  if (isCritical) {
    attackPhaseResult.hitResult = 'CRITICAL';
  }

  const attackRollSucceeded = (attackRoll + attackerFighter.attackRollBonus() - defendingFighter.AC()) > 0;
  const inflictedDamage = attackDamage(attackerFighter) * (isCritical ? 2 : 1); // Critical inficts double Damage
  const totalInfictedDamage = inflictedDamage - defendingFighter.damageReduction();

  if ((attackRollSucceeded || isCritical) && totalInfictedDamage > 0) {
    const lifeLeftAfterHit = defendingFighter.HP() - totalInfictedDamage;
    attackPhaseResult.defenderHP = defendingFighter.HP(lifeLeftAfterHit);

    attackPhaseResult.inflictedDamage = totalInfictedDamage;
  }  

  if (totalInfictedDamage < 1) {
    attackPhaseResult.hitResult = 'BLOCKED';
  } else if (!attackRollSucceeded) {
    attackPhaseResult.hitResult = 'DODGED';;
  }

  if (attackerFighter.HP() < 1 || defendingFighter.HP() < 1) {
    attackPhaseResult.phase = 'FIGHT_ENDED';
  }

  return attackPhaseResult;
}

const getBattleLog = (fighterLeft, fighterRight) => {
  const battleLog = [];
  let eventIDCounter = 0;

  battleLog.push({eventID: ++eventIDCounter , phase: 'ANNOUNCEMENT',fighterLeft, fighterRight})

  do {
    const [attacker, defender] = getSortedHeroesByInitiativeRoll(fighterLeft, fighterRight);
    battleLog.push({eventID: ++eventIDCounter, ...getAttackPhaseResult(attacker,defender)});
  } while (fighterLeft.HP() > 0 && fighterRight.HP() > 0)

  return battleLog;
}
// #endregion Experimental

exports.default = getBattleLog;