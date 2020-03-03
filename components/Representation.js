
const getStrTimes = require('../libs/getStrTimes').default;

const representHP = (...fightersNameAndHP) => {
  fightersNameAndHP.forEach(({name, HP}) => {
    const fighterNameWithTrailingSpace = name + getStrTimes(' ', 15-name.length);
    const fighterLeftHPOutOf20 = Math.ceil((HP*20)/100);
    console.log(`${fighterNameWithTrailingSpace}: [${getStrTimes('#', fighterLeftHPOutOf20)}${getStrTimes(' ', Math.min(20, 20 - fighterLeftHPOutOf20))}](${HP})`);
  });
}

const representAnnouncement = (firstFighterName, secondFighterName) => {
  console.log('');
  console.log('=================================================');
  console.log(`${firstFighterName} fights against ${secondFighterName}`);
  console.log('=================================================');
  console.log('');
}

const representAttack = (battleLogEntry) => {
  const { 
    hitResult, 
    attackerName, 
    defenderName, 
    inflictedDamage 
  } = battleLogEntry;

  switch (hitResult) {
    case('NORMAL'):
    case('CRITICAL'): {
      console.log(`${attackerName} ${hitResult === 'CRITICAL' ? 'power strikes' : 'jabs'} ${defenderName} for ${inflictedDamage} damage`);
      console.log('');
      break;
    }
    case('DODGED'): {
      console.log(`${defenderName} dodges ${attackerName}'s hit` );
      console.log('');
      break;
    }
    case('BLOCKED'): {
      console.log(`${attackerName}'s attacks was blocked effectively by ${defenderName}` );
      console.log('');
      break;
    }
    default: {
      throw `Unexpected hitResult value: ${hitResult}`;
    }
  }
}

const representFightEnding = (battleLogEntry) => {
  const { 
    attackerName, 
    defenderName,
    defenderHP,
    inflictedDamage 
  } = battleLogEntry;

  if (defenderHP < -9) {
    console.error(`A vicious strike from ${attackerName} for ${inflictedDamage} damage, sends ${defenderName} unconscious, over the ropes and off the ring !!`);
  } else {
    console.info(`${attackerName} knocks out ${defenderName} with a ${inflictedDamage} damage blow.`);
  }

  console.info(`The winner by knockout is: ${attackerName}!`);
}

const representBattleLogEntry = (battleLogEntry) => {
  const { 
    phase, 
  } = battleLogEntry;
  
  switch (phase) {
    case ('ANNOUNCEMENT'): {
      const { fighterLeft, fighterRight } = battleLogEntry;
      representAnnouncement(fighterLeft.name(), fighterRight.name());
      console.log('');
      break;
    }
    case ('FIGHT'): {
      console.log('');
      console.log('');
      representAttack(battleLogEntry);
      break;
    }
    case ('FIGHT_ENDED'): {
      console.log('');
      console.log('');
      console.log('');
      representFightEnding(battleLogEntry);
      console.log('');
      break;
    }
    default: {
      throw `$Uknown phase entry: ${phase}`;
    }
  }
}

/**
 * Represent the fight's battlelog
 * @param {Object[]} battleLog 
 * @param {number} timeInterval in ms, will represent the battle with scrolling text, with pauses between event given this value
 * @param {boolean} withConsoleLogRefresh console will show one thing a time if this boolean is set to true
 */
function representBattle(battleLog, timeInterval = 0, withConsoleLogRefresh = false) {
  const { fighterLeft } = battleLog.find(battleLogEntry => battleLogEntry.phase === 'ANNOUNCEMENT');
  battleLog.forEach(battleLogEntry => {
    representBattleLogEntry(battleLogEntry);
    
    if (battleLogEntry.phase !== 'ANNOUNCEMENT'){
      const { attackerName, defenderName, attackerHP, defenderHP} = battleLogEntry;
      (fighterLeft.name() === attackerName) ? representHP({name: attackerName, HP: attackerHP}, {name: defenderName, HP: defenderHP} ) : representHP({name: defenderName, HP: defenderHP}, {name: attackerName, HP: attackerHP});
    }
  })
}

exports.default = representBattle;