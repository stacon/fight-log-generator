'use strict';

const Roll = require('../Roll/Roll');
const getNumberBetweenMinMax = require('../Roll/libs/getNumberBetweenMinAndMax');

const Logger = require('./libs/Logger');
const log = Logger();


// for annotation and linting purposes
const Hero = require('./Hero');

/**
 * Return the roll of a hero's initiative roll.
 * @param {Hero} hero
 * @returns {number} the initiative roll result.
 */
const rollInitiative = (hero) => Roll.D(20) + hero.initiativeRollBonus();

/**
 * @param {Hero} hero 
 * @returns {number} the attack roll result.
 */
const attackRoll = (hero) => Roll.D(20) + hero.attackRollBonus();

/**
 * @param {Hero} hero 
 * @returns {number} the attack damage roll result.
 */
const attackDamage = (hero) => Roll.D(hero.attackDamageRoll());

/**
 * Returns an ordered hero list based on the performed initiative roll
 * @param {Hero[]} heroes 
 * @returns {Hero[]} array of IDs shortened based on initiative roll
 */
const attackOrder = (...heroes) => {
  if (heroes.length < 2) return [];
  const heroesWithInitiativeRolls = heroes.map((hero) => ({hero, initiativeRoll: rollInitiative(hero)}));
  const heroesWithInitiativeRollsOrdered = heroesWithInitiativeRolls
                                    .sort((result1, result2) => {
                                      if (result1.initiativeRoll === result2.initiativeRoll) {
                                        return [`result${getNumberBetweenMinMax(1,2).toString()}`];
                                      }

                                      return result1.initiativeRoll > result2.initiativeRoll ? result1 : result2;
                                    });
  
  return heroesWithInitiativeRollsOrdered.map(heroWithRoll => heroWithRoll.hero);
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
    const [attacker, defender] = attackOrder(heroLeft, heroRight);
    attackPhase(attacker, defender);
    defender.HP() > 0 && attackPhase(defender, attacker);
  } while (heroLeft.HP() > 0 && heroRight.HP() > 0)

  console.log('');
  console.log(`The winner is ${heroLeft.HP() > 0 ? heroLeft.name() : heroRight.name()}`);
  console.log('');
  
}


Battle(new Hero("Hercules"), new Hero("Gandalf"));