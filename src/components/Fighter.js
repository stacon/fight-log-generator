"use strict";

const { Roll, d, sum } = require("@stacon/roll");
const { randomID } = require("../libs");

const D3 = d(3);
const D4 = d(4);
const D6 = d(6);

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
  _ID = "temp" + randomID(),
  _hp = 100,
  _armorBonus = sum(Roll.times(2)(D3)),
  _initiativeRollBonus = Roll(D4),
  _attackRollBonus = Roll(D6),
  _armorClass = 8 + sum(Roll.times(3)(D3)),
  _attackDamageRoll = () => sum(Roll.times(3)(D4))
) {
  return {
    ID: (setID) => {
      if (!!setID) _ID = setID;
      return _ID;
    },
    initiativeRollBonus: () => _initiativeRollBonus,
    attackRollBonus: () => _attackRollBonus,
    attackDamageRoll: () => _attackDamageRoll(),
    HP: (setHP) => {
      if (!!setHP) _hp = setHP;
      return _hp;
    },
    damageReduction: () => _armorBonus,
    AC: () => _armorClass,
  };
}

exports.default = Fighter;
