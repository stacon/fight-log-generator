'use strict';

const Roll = require('../../Roll/Roll');
const { randomID } = require('../libs');

/**
 * A Functional component that represents a fighter
 * @param {string} name fighter's display name 
 * @param {string} id a random has for distrinction purposes
 * @returns a group of getter methods and an HP setter method
 */
function Fighter(name, id) {
  const _ID = id || 'temp' + randomID();
  const _name = name;

  let _hp = 100;
  const _armorBonus = Roll.D(3, 2);

  const _initiativeRollBonus = Roll.D(4);
  const _attackRollBonus = Roll.D(6);
  const _armorClass = 8 + Roll.D(3, 3);
  
  const _attackDamageRoll = {4: 3};

  return {
    ID: () => _ID,
    name: () => _name,
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