
const { getStrTimes } = require('../libs');


/**
 * Visually represents (consoles) fighter's HP in a line (eg. "Muhammad Ali   : [###############     ](72)"")
 * @param  {...{name: string, HP: number}} fightersNameAndHP objects with fighter'name and HP
 */
const representHP = (...fightersNameAndHP) => {
  fightersNameAndHP.forEach(({name, HP}) => {
    const fighterNameWithTrailingSpace = name + getStrTimes(' ', 15-name.length);
    const fighter1HPOutOf20 = Math.ceil((HP*20)/100);
    console.log(`${fighterNameWithTrailingSpace}: [${getStrTimes('#', fighter1HPOutOf20)}${getStrTimes(' ', Math.min(20, 20 - fighter1HPOutOf20))}](${HP})`);
  });
}

/**
 * Visually represents (consoles) fighters' names
 * @param {string} firstFighterName 
 * @param {string} secondFighterName 
 */
const representAnnouncement = (firstFighterName, secondFighterName) => {
  console.log('\n=================================================');
  console.log(`${firstFighterName} fights against ${secondFighterName}`);
  console.log('=================================================\n');
}

/**
 * Visually represents (consoles) a battaleLogEntry with phase === 'FIGHT'
 * @param {Object} battleLogEntry 
 */
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
      console.log(`${attackerName} ${hitResult === 'CRITICAL' ? 'power strikes' : 'jabs'} ${defenderName} for ${inflictedDamage} damage\n`);
      break;
    }
    case('DODGED'): {
      console.log(`${defenderName} dodges ${attackerName}'s hit\n` );
      break;
    }
    case('BLOCKED'): {
      console.log(`${attackerName}'s attack was blocked effectively by ${defenderName}\n` );
      break;
    }
    default: {
      throw `Unexpected hitResult value: ${hitResult}`;
    }
  }
}

/**
 * Visually represents (consoles) a battaleLogEntry with phase === 'FIGHT_ENDED'
 * @param {Object} battleLogEntry 
 */
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

  console.info(`\nThe winner by knockout is: ${attackerName}!`);
}

/**
 * Visually represents (consoles) a battaleLogEntry
 * @param {Object} battleLogEntry 
 */
const representBattleLogEntry = (battleLogEntry) => {
  const { 
    phase, 
  } = battleLogEntry;
  
  switch (phase) {
    case ('ANNOUNCEMENT'): {
      const { fighter1, fighter2 } = battleLogEntry;
      representAnnouncement(fighter1.name(), fighter2.name());
      break;
    }
    case ('FIGHT'): {
      console.log('\n');
      representAttack(battleLogEntry);
      break;
    }
    case ('FIGHT_ENDED'): {
      console.log('\n\n');
      representFightEnding(battleLogEntry);
      console.log('');
      break;
    }
    default: {
      throw `Uknown phase entry: ${phase}`;
    }
  }
}

/**
 * Represents fight's battlelog
 * @param {Object[]} battleLog 
 * @param {number} timeInterval in ms, will represent the battle with scrolling text, with pauses between event given this value
 * @param {boolean} withConsoleLogRefresh console will show one thing a time if this boolean is set to true
 */
function representBattle(battleLog, timeInterval = 0, withConsoleLogRefresh = false) {
  const { fighter1 } = battleLog.find(battleLogEntry => battleLogEntry.phase === 'ANNOUNCEMENT');
  if(timeInterval > 0 ) {
    let i = 0;
    const fightEventsInterval = setInterval(() => {
      if (withConsoleLogRefresh) console.clear();

      representBattleLogEntry(battleLog[i]);
    
      if (battleLog[i].phase !== 'ANNOUNCEMENT'){
        const { attackerName, defenderName, attackerHP, defenderHP} = battleLog[i];
        (fighter1.name() === attackerName) ? representHP({name: attackerName, HP: attackerHP}, {name: defenderName, HP: defenderHP} ) : representHP({name: defenderName, HP: defenderHP}, {name: attackerName, HP: attackerHP});
      }

      if (battleLog[i].phase === 'FIGHT_ENDED') {
        clearInterval(fightEventsInterval)
      }

      i++;
    }, timeInterval);
    
    return;
  }

  battleLog.forEach(battleLogEntry => {
    representBattleLogEntry(battleLogEntry);
    
    if (battleLogEntry.phase !== 'ANNOUNCEMENT'){
      const { attackerName, defenderName, attackerHP, defenderHP} = battleLogEntry;
      (fighter1.name() === attackerName) ? representHP({name: attackerName, HP: attackerHP}, {name: defenderName, HP: defenderHP} ) : representHP({name: defenderName, HP: defenderHP}, {name: attackerName, HP: attackerHP});
    }
  })
}

exports.default = representBattle;