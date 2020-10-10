// for annotation and linting purposes
const { Roll, d } = require("@stacon/roll");
const D20 = d(20);

const Fighter = require("./Fighter").Fighter;
const { getNumberBetweenMinAndMax } = require("../libs");

/**
 * Return the roll of a fighter's initiative roll.
 * @param {Fighter} fighter
 * @returns {number} the initiative roll result.
 */
const rollInitiative = (fighter) => Roll(D20) + fighter.initiativeRollBonus();

/**
 * @param {Fighter} fighter
 * @returns {number} the attack damage roll result.
 */
const attackDamage = (fighter) => fighter.attackDamageRoll();

/**
 * Returns an ordered fighter list based on the performed initiative roll
 * @param {Fighter[]} fighters
 * @returns {Fighter[]} array of IDs shortened based on initiative roll
 */
const getSortedFightersByInitiativeRoll = (...fighters) => {
  const fightersWithInitiativeRolls = fighters.map((fighter) => ({
    fighter,
    initiativeRoll: rollInitiative(fighter),
  }));
  const fightersWithInitiativeRollsOrdered = fightersWithInitiativeRolls.sort(
    (result1, result2) => {
      if (result1.initiativeRoll === result2.initiativeRoll) {
        return getNumberBetweenMinAndMax(0, 1) === 0 ? -1 : 1;
      }

      return result1.initiativeRoll > result2.initiativeRoll ? -1 : 1;
    }
  );

  return fightersWithInitiativeRollsOrdered.map(
    (fighterWithRoll) => fighterWithRoll.fighter
  );
};

module.exports = {
  attackDamage,
  getSortedFightersByInitiativeRoll,
};
