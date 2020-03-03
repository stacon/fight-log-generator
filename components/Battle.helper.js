// for annotation and linting purposes
const Hero = require('./Hero').default;

const Roll = require('../../Roll/Roll');
const getNumberBetweenMinMax = require('../../Roll/libs/getNumberBetweenMinAndMax');

/**
 * Return the roll of a hero's initiative roll.
 * @param {Hero} hero
 * @returns {number} the initiative roll result.
 */
const rollInitiative = (hero) => Roll.D(20) + hero.initiativeRollBonus();

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
const getSortedHeroesByInitiativeRoll = (...heroes) => {
  const heroesWithInitiativeRolls = heroes.map((hero) => ({hero, initiativeRoll: rollInitiative(hero)}));
  const heroesWithInitiativeRollsOrdered = (
    heroesWithInitiativeRolls
        .sort((result1, result2) => {
          if (result1.initiativeRoll === result2.initiativeRoll) {
            return getNumberBetweenMinMax(0,1) === 0 ? -1 : 1;
          }

          return result1.initiativeRoll > result2.initiativeRoll ? -1 : 1;
        })
  );
  
  return heroesWithInitiativeRollsOrdered.map(heroWithRoll => heroWithRoll.hero);
}

module.exports = {
  attackDamage,
  getSortedHeroesByInitiativeRoll
}