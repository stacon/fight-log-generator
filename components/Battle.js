'use strict';

const Roll = require('../../Roll/Roll');
const Logger = require('../libs/Logger');
const { getSortedHeroesByInitiativeRoll, attackDamage } = require('./Battle.helper');
const getStrTimes = require('../libs/getStrTimes').default;
const log = Logger();

const showHP = (heroLeft, heroRight) => {
  const heroLeftNameWithTrailingSpace = heroLeft.name() + getStrTimes(' ', 15-heroLeft.name().length);
  const heroRightNameWithTrailingSpace = heroRight.name() + getStrTimes(' ', 15-heroRight.name().length);

  const heroLeftHPOutOf20 = Math.round((heroLeft.HP()*20)/100);
  const heroRightHPOutOf20 = Math.round((heroRight.HP()*20)/100);

  console.log(`${heroLeftNameWithTrailingSpace}: [${getStrTimes('#', heroLeftHPOutOf20)}${getStrTimes(' ', Math.min(20, 20 - heroLeftHPOutOf20))}](${heroLeft.HP()})`);
  console.log(`${heroRightNameWithTrailingSpace}: [${getStrTimes('#', heroRightHPOutOf20)}${getStrTimes(' ', Math.min(20, 20 - heroRightHPOutOf20))}](${heroRight.HP()})`);
  console.log(``);
}

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
    showHP(heroLeft,heroRight);
  } while (heroLeft.HP() > 0 && heroRight.HP() > 0)

  console.log('');
  console.log(`The winner is ${heroLeft.HP() > 0 ? heroLeft.name() : heroRight.name()}`);
  console.log('');
  
}

exports.default = Battle;