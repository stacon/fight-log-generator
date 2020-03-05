// for annotation and linting purposes
const Fighter = require('./Fighter').Fighter;

const Roll = require('../../../Roll/Roll');
const getNumberBetweenMinMax = require('../../../Roll/libs/getNumberBetweenMinAndMax');

/**
 * Return the roll of a fighter's initiative roll.
 * @param {Fighter} fighter
 * @returns {number} the initiative roll result.
 */
const rollInitiative = (fighter) => Roll.d(20) + fighter.initiativeRollBonus();

/**
 * @param {Fighter} fighter 
 * @returns {number} the attack damage roll result.
 */
const attackDamage = (fighter) => Roll.d(fighter.attackDamageRoll());

/**
 * Returns an ordered fighter list based on the performed initiative roll
 * @param {Fighter[]} fighters 
 * @returns {Fighter[]} array of IDs shortened based on initiative roll
 */
const getSortedFightersByInitiativeRoll = (...fighters) => {
  const fightersWithInitiativeRolls = fighters.map((fighter) => ({fighter, initiativeRoll: rollInitiative(fighter)}));
  const fightersWithInitiativeRollsOrdered = (
    fightersWithInitiativeRolls
        .sort((result1, result2) => {
          if (result1.initiativeRoll === result2.initiativeRoll) {
            return getNumberBetweenMinMax(0,1) === 0 ? -1 : 1;
          }

          return result1.initiativeRoll > result2.initiativeRoll ? -1 : 1;
        })
  );
  
  return fightersWithInitiativeRollsOrdered.map(fighterWithRoll => fighterWithRoll.fighter);
}

module.exports = {
  attackDamage,
  getSortedFightersByInitiativeRoll
}