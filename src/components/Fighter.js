'use strict';

const Roll = require('../../../Roll/Roll');
const { randomID } = require('../libs');

/**
 * A Functional component that represents a fighter
 * @param {string} _ID Fighter'ss uniqueID. Default: random "tempXXXXXX".
 * @param {number} _hp Fighter's health points. Default: 100.
 * @param {number} _armorBonus Fighter's damage reduction against attacks. Default: roll 2d3
 * @param {number} _initiativeRollBonus Fighter's initiative to attack bonus. Default: roll d4
 * @param {number} _attackRollBonus Fighter's attackRoll bonus attop attack roll. Default: roll d6
 * @param {number} _armorClass Fighter's armor class. Default: 8 + 3d3
 * @param {{diceDimentions, times}} _attackDamageRoll Fighter's attack damage roll based on Roll API. Default 3d4
 */
function Fighter(
  _ID = 'temp' + randomID(), 
  _hp = 100, 
  _armorBonus = Roll.d(3, 2),
  _initiativeRollBonus = Roll.d(4),
  _attackRollBonus = Roll.d(6),
  _armorClass = 8 + Roll.d(3, 3),
  _attackDamageRoll = {4: 3},
) {
  return {
    ID: (setID) => {
      if(!!setID) _ID = setID;
      return _ID;
    },
    initiativeRollBonus: () => _initiativeRollBonus,
    attackRollBonus: () => _attackRollBonus,
    attackDamageRoll: () => _attackDamageRoll,
    HP: (setHP) => {
      if(!!setHP) _hp = setHP;
      return _hp;
    },
    damageReduction: () => _armorBonus,
    AC: () => _armorClass,
  }
}

exports.default = Fighter;