'use strict';

const Roll = require('../../Roll/Roll');
const Logger = require('../libs/Logger');
const { getSortedHeroesByInitiativeRoll, attackDamage } = require('./Battle.helper');

const log = Logger();

const attackPhase = (attackerHero, defenderHero) => {
  const attackRoll = Roll.D(20);
  const isCritical = attackRoll > 18;
  const attackRollSucceeded = (attackRoll + attackerHero.attackRollBonus() - defenderHero.AC()) > 0;
  const inflictedDamage = attackDamage(attackerHero) * (isCritical ? 2 : 1); // Critical inficts double Damage
  const totalInfictedDamage = inflictedDamage - defenderHero.damageReduction();

  if ((attackRollSucceeded || isCritical) && totalInfictedDamage > 0) {
    defenderHero.HP(defenderHero.HP() - totalInfictedDamage);
    log(`${attackerHero.name()}${isCritical ? ' critically' : ''} hits ${defenderHero.name()} for ${totalInfictedDamage} damage`);
  }

  if (totalInfictedDamage < 1) {
    log(`${attackerHero.name()}'s attack blocked effectively by ${defenderHero.name()}`);
  } else if (!attackRollSucceeded) {
    log(`${attackerHero.name()}'s attack was dogded by ${defenderHero.name()}`);
  }

  console.log(`${attackerHero.name()}: ${attackerHero.HP()} - ${defenderHero.name()}: ${defenderHero.HP()}`);
  console.log(``);
}

const Battle = (heroLeft, heroRight) => {
  console.log('');
  console.log('===========================================');
  console.log(`${heroLeft.name()} fights against ${heroRight.name()}!`);
  console.log('===========================================');
  console.log('');

  do {
    const [attacker, defender] = getSortedHeroesByInitiativeRoll(heroLeft, heroRight);
    attackPhase(attacker, defender);
    defender.HP() > 0 && attackPhase(defender, attacker);
  } while (heroLeft.HP() > 0 && heroRight.HP() > 0)

  console.log('');
  console.log(`The winner is ${heroLeft.HP() > 0 ? heroLeft.name() : heroRight.name()}`);
  console.log('');
  
}

exports.default = Battle;