# Fight generator

## Description

A program that exports fightLog function. Envoking this functions returns a JavaScript object which represents a fight between two opponents.

### Key Descriptions

#### Fightlog object

- "fighter1ID": "identifier of the first fighter"
- "fighter1StartingHP": "starting life points of first fighter"
- "fighter2ID": "identifier of the second fighter"
- "fighter2StartingHP": "starting life points of second fighter"\n
- "fitghtLog": "Array of events that represent the battle"\n\n

#### Fightlog event object

- "eventID": "increasing number to enum events",
- "phase": "FIGHT | FIGHT_ENDED indicates the status of the battle",
- "attackerID": "phase attackers fighterID",
- "attackerHP": "phase attackers HP",
- "defenderID": "phase defenders fighterID",
- "defenderHP": "phase defender fighterID",
- "inflictedDamage": "damage inflicted from attacker to defender",
- "hitResult": "NORMAL | DODGED | CRITICAL | BLOCKED represents the hit result"

## Example

```
const fightLog = require('@stacon/fight-log');

const log = fightLog();

console.log(log);

// Example output below
{
  "fighter1ID": "tempz74h448",
  "fighter1StartingHP": 100,
  "fighter2ID": "tempuctmwl8",
  "fighter2StartingHP": 100,
  "fightLog": [
    {
      "eventID": 1,
      "phase": "FIGHT",
      "attackerID": "tempz74h448",
      "attackerHP": 100,
      "defenderID": "tempuctmwl8",
      "defenderHP": 92,
      "inflictedDamage": 8,
      "hitResult": "NORMAL"
    },
    {
      "eventID": 2,
      "phase": "FIGHT",
      "attackerID": "tempz74h448",
      "attackerHP": 100,
      "defenderID": "tempuctmwl8",
      "defenderHP": 72,
      "inflictedDamage": 20,
      "hitResult": "CRITICAL"
    },
    {
      "eventID": 3,
      "phase": "FIGHT",
      "attackerID": "tempz74h448",
      "attackerHP": 100,
      "defenderID": "tempuctmwl8",
      "defenderHP": 72,
      "inflictedDamage": 0,
      "hitResult": "DODGED"
    },
    {
      "eventID": 4,
      "phase": "FIGHT",
      "attackerID": "tempuctmwl8",
      "attackerHP": 72,
      "defenderID": "tempz74h448",
      "defenderHP": 100,
      "inflictedDamage": 0,
      "hitResult": "DODGED"
    },
    {
      "eventID": 5,
      "phase": "FIGHT",
      "attackerID": "tempz74h448",
      "attackerHP": 100,
      "defenderID": "tempuctmwl8",
      "defenderHP": 62,
      "inflictedDamage": 10,
      "hitResult": "NORMAL"
    },
    {
      "eventID": 6,
      "phase": "FIGHT",
      "attackerID": "tempz74h448",
      "attackerHP": 100,
      "defenderID": "tempuctmwl8",
      "defenderHP": 62,
      "inflictedDamage": 0,
      "hitResult": "DODGED"
    },
    {
      "eventID": 7,
      "phase": "FIGHT",
      "attackerID": "tempz74h448",
      "attackerHP": 100,
      "defenderID": "tempuctmwl8",
      "defenderHP": 62,
      "inflictedDamage": 0,
      "hitResult": "DODGED"
    },
    {
      "eventID": 8,
      "phase": "FIGHT",
      "attackerID": "tempuctmwl8",
      "attackerHP": 62,
      "defenderID": "tempz74h448",
      "defenderHP": 100,
      "inflictedDamage": 0,
      "hitResult": "BLOCKED"
    },
    {
      "eventID": 9,
      "phase": "FIGHT",
      "attackerID": "tempz74h448",
      "attackerHP": 100,
      "defenderID": "tempuctmwl8",
      "defenderHP": 62,
      "inflictedDamage": 0,
      "hitResult": "DODGED"
    },
    {
      "eventID": 10,
      "phase": "FIGHT",
      "attackerID": "tempz74h448",
      "attackerHP": 100,
      "defenderID": "tempuctmwl8",
      "defenderHP": 52,
      "inflictedDamage": 10,
      "hitResult": "CRITICAL"
    },
    {
      "eventID": 11,
      "phase": "FIGHT",
      "attackerID": "tempuctmwl8",
      "attackerHP": 52,
      "defenderID": "tempz74h448",
      "defenderHP": 98,
      "inflictedDamage": 2,
      "hitResult": "NORMAL"
    },
    {
      "eventID": 12,
      "phase": "FIGHT",
      "attackerID": "tempuctmwl8",
      "attackerHP": 52,
      "defenderID": "tempz74h448",
      "defenderHP": 97,
      "inflictedDamage": 1,
      "hitResult": "NORMAL"
    },
    {
      "eventID": 13,
      "phase": "FIGHT",
      "attackerID": "tempuctmwl8",
      "attackerHP": 52,
      "defenderID": "tempz74h448",
      "defenderHP": 97,
      "inflictedDamage": 0,
      "hitResult": "BLOCKED"
    },
    {
      "eventID": 14,
      "phase": "FIGHT",
      "attackerID": "tempuctmwl8",
      "attackerHP": 52,
      "defenderID": "tempz74h448",
      "defenderHP": 89,
      "inflictedDamage": 8,
      "hitResult": "CRITICAL"
    },
    {
      "eventID": 15,
      "phase": "FIGHT",
      "attackerID": "tempuctmwl8",
      "attackerHP": 52,
      "defenderID": "tempz74h448",
      "defenderHP": 87,
      "inflictedDamage": 2,
      "hitResult": "NORMAL"
    },
    {
      "eventID": 16,
      "phase": "FIGHT",
      "attackerID": "tempuctmwl8",
      "attackerHP": 52,
      "defenderID": "tempz74h448",
      "defenderHP": 85,
      "inflictedDamage": 2,
      "hitResult": "NORMAL"
    },
    {
      "eventID": 17,
      "phase": "FIGHT",
      "attackerID": "tempz74h448",
      "attackerHP": 85,
      "defenderID": "tempuctmwl8",
      "defenderHP": 52,
      "inflictedDamage": 0,
      "hitResult": "DODGED"
    },
    {
      "eventID": 18,
      "phase": "FIGHT",
      "attackerID": "tempuctmwl8",
      "attackerHP": 52,
      "defenderID": "tempz74h448",
      "defenderHP": 85,
      "inflictedDamage": 0,
      "hitResult": "BLOCKED"
    },
    {
      "eventID": 19,
      "phase": "FIGHT",
      "attackerID": "tempz74h448",
      "attackerHP": 85,
      "defenderID": "tempuctmwl8",
      "defenderHP": 52,
      "inflictedDamage": 0,
      "hitResult": "DODGED"
    },
    {
      "eventID": 20,
      "phase": "FIGHT",
      "attackerID": "tempz74h448",
      "attackerHP": 85,
      "defenderID": "tempuctmwl8",
      "defenderHP": 52,
      "inflictedDamage": 0,
      "hitResult": "DODGED"
    },
    {
      "eventID": 21,
      "phase": "FIGHT",
      "attackerID": "tempz74h448",
      "attackerHP": 85,
      "defenderID": "tempuctmwl8",
      "defenderHP": 52,
      "inflictedDamage": 0,
      "hitResult": "DODGED"
    },
    {
      "eventID": 22,
      "phase": "FIGHT",
      "attackerID": "tempz74h448",
      "attackerHP": 85,
      "defenderID": "tempuctmwl8",
      "defenderHP": 50,
      "inflictedDamage": 2,
      "hitResult": "NORMAL"
    },
    {
      "eventID": 23,
      "phase": "FIGHT",
      "attackerID": "tempuctmwl8",
      "attackerHP": 50,
      "defenderID": "tempz74h448",
      "defenderHP": 85,
      "inflictedDamage": 0,
      "hitResult": "BLOCKED"
    },
    {
      "eventID": 24,
      "phase": "FIGHT",
      "attackerID": "tempuctmwl8",
      "attackerHP": 50,
      "defenderID": "tempz74h448",
      "defenderHP": 81,
      "inflictedDamage": 4,
      "hitResult": "NORMAL"
    },
    {
      "eventID": 25,
      "phase": "FIGHT",
      "attackerID": "tempuctmwl8",
      "attackerHP": 50,
      "defenderID": "tempz74h448",
      "defenderHP": 76,
      "inflictedDamage": 5,
      "hitResult": "NORMAL"
    },
    {
      "eventID": 26,
      "phase": "FIGHT",
      "attackerID": "tempz74h448",
      "attackerHP": 76,
      "defenderID": "tempuctmwl8",
      "defenderHP": 41,
      "inflictedDamage": 9,
      "hitResult": "NORMAL"
    },
    {
      "eventID": 27,
      "phase": "FIGHT",
      "attackerID": "tempuctmwl8",
      "attackerHP": 41,
      "defenderID": "tempz74h448",
      "defenderHP": 68,
      "inflictedDamage": 8,
      "hitResult": "CRITICAL"
    },
    {
      "eventID": 28,
      "phase": "FIGHT",
      "attackerID": "tempz74h448",
      "attackerHP": 68,
      "defenderID": "tempuctmwl8",
      "defenderHP": 33,
      "inflictedDamage": 8,
      "hitResult": "NORMAL"
    },
    {
      "eventID": 29,
      "phase": "FIGHT",
      "attackerID": "tempuctmwl8",
      "attackerHP": 33,
      "defenderID": "tempz74h448",
      "defenderHP": 67,
      "inflictedDamage": 1,
      "hitResult": "NORMAL"
    },
    {
      "eventID": 30,
      "phase": "FIGHT",
      "attackerID": "tempuctmwl8",
      "attackerHP": 33,
      "defenderID": "tempz74h448",
      "defenderHP": 63,
      "inflictedDamage": 4,
      "hitResult": "NORMAL"
    },
    {
      "eventID": 31,
      "phase": "FIGHT",
      "attackerID": "tempz74h448",
      "attackerHP": 63,
      "defenderID": "tempuctmwl8",
      "defenderHP": 33,
      "inflictedDamage": 0,
      "hitResult": "DODGED"
    },
    {
      "eventID": 32,
      "phase": "FIGHT",
      "attackerID": "tempuctmwl8",
      "attackerHP": 33,
      "defenderID": "tempz74h448",
      "defenderHP": 63,
      "inflictedDamage": 0,
      "hitResult": "BLOCKED"
    },
    {
      "eventID": 33,
      "phase": "FIGHT",
      "attackerID": "tempuctmwl8",
      "attackerHP": 33,
      "defenderID": "tempz74h448",
      "defenderHP": 63,
      "inflictedDamage": 0,
      "hitResult": "DODGED"
    },
    {
      "eventID": 34,
      "phase": "FIGHT",
      "attackerID": "tempuctmwl8",
      "attackerHP": 33,
      "defenderID": "tempz74h448",
      "defenderHP": 63,
      "inflictedDamage": 0,
      "hitResult": "DODGED"
    },
    {
      "eventID": 35,
      "phase": "FIGHT",
      "attackerID": "tempuctmwl8",
      "attackerHP": 33,
      "defenderID": "tempz74h448",
      "defenderHP": 53,
      "inflictedDamage": 10,
      "hitResult": "CRITICAL"
    },
    {
      "eventID": 36,
      "phase": "FIGHT",
      "attackerID": "tempuctmwl8",
      "attackerHP": 33,
      "defenderID": "tempz74h448",
      "defenderHP": 51,
      "inflictedDamage": 2,
      "hitResult": "NORMAL"
    },
    {
      "eventID": 37,
      "phase": "FIGHT",
      "attackerID": "tempuctmwl8",
      "attackerHP": 33,
      "defenderID": "tempz74h448",
      "defenderHP": 51,
      "inflictedDamage": 0,
      "hitResult": "BLOCKED"
    },
    {
      "eventID": 38,
      "phase": "FIGHT",
      "attackerID": "tempuctmwl8",
      "attackerHP": 33,
      "defenderID": "tempz74h448",
      "defenderHP": 35,
      "inflictedDamage": 16,
      "hitResult": "CRITICAL"
    },
    {
      "eventID": 39,
      "phase": "FIGHT",
      "attackerID": "tempuctmwl8",
      "attackerHP": 33,
      "defenderID": "tempz74h448",
      "defenderHP": 33,
      "inflictedDamage": 2,
      "hitResult": "NORMAL"
    },
    {
      "eventID": 40,
      "phase": "FIGHT",
      "attackerID": "tempuctmwl8",
      "attackerHP": 33,
      "defenderID": "tempz74h448",
      "defenderHP": 33,
      "inflictedDamage": 0,
      "hitResult": "BLOCKED"
    },
    {
      "eventID": 41,
      "phase": "FIGHT",
      "attackerID": "tempuctmwl8",
      "attackerHP": 33,
      "defenderID": "tempz74h448",
      "defenderHP": 33,
      "inflictedDamage": 0,
      "hitResult": "DODGED"
    },
    {
      "eventID": 42,
      "phase": "FIGHT",
      "attackerID": "tempz74h448",
      "attackerHP": 33,
      "defenderID": "tempuctmwl8",
      "defenderHP": 29,
      "inflictedDamage": 4,
      "hitResult": "NORMAL"
    },
    {
      "eventID": 43,
      "phase": "FIGHT",
      "attackerID": "tempuctmwl8",
      "attackerHP": 29,
      "defenderID": "tempz74h448",
      "defenderHP": 33,
      "inflictedDamage": 0,
      "hitResult": "DODGED"
    },
    {
      "eventID": 44,
      "phase": "FIGHT",
      "attackerID": "tempz74h448",
      "attackerHP": 33,
      "defenderID": "tempuctmwl8",
      "defenderHP": 27,
      "inflictedDamage": 2,
      "hitResult": "NORMAL"
    },
    {
      "eventID": 45,
      "phase": "FIGHT",
      "attackerID": "tempz74h448",
      "attackerHP": 33,
      "defenderID": "tempuctmwl8",
      "defenderHP": 27,
      "inflictedDamage": 0,
      "hitResult": "DODGED"
    },
    {
      "eventID": 46,
      "phase": "FIGHT",
      "attackerID": "tempuctmwl8",
      "attackerHP": 27,
      "defenderID": "tempz74h448",
      "defenderHP": 33,
      "inflictedDamage": 0,
      "hitResult": "BLOCKED"
    },
    {
      "eventID": 47,
      "phase": "FIGHT",
      "attackerID": "tempuctmwl8",
      "attackerHP": 27,
      "defenderID": "tempz74h448",
      "defenderHP": 33,
      "inflictedDamage": 0,
      "hitResult": "DODGED"
    },
    {
      "eventID": 48,
      "phase": "FIGHT",
      "attackerID": "tempuctmwl8",
      "attackerHP": 27,
      "defenderID": "tempz74h448",
      "defenderHP": 23,
      "inflictedDamage": 10,
      "hitResult": "CRITICAL"
    },
    {
      "eventID": 49,
      "phase": "FIGHT",
      "attackerID": "tempuctmwl8",
      "attackerHP": 27,
      "defenderID": "tempz74h448",
      "defenderHP": 13,
      "inflictedDamage": 10,
      "hitResult": "CRITICAL"
    },
    {
      "eventID": 50,
      "phase": "FIGHT",
      "attackerID": "tempz74h448",
      "attackerHP": 13,
      "defenderID": "tempuctmwl8",
      "defenderHP": 25,
      "inflictedDamage": 2,
      "hitResult": "NORMAL"
    },
    {
      "eventID": 51,
      "phase": "FIGHT",
      "attackerID": "tempuctmwl8",
      "attackerHP": 25,
      "defenderID": "tempz74h448",
      "defenderHP": 13,
      "inflictedDamage": 0,
      "hitResult": "BLOCKED"
    },
    {
      "eventID": 52,
      "phase": "FIGHT",
      "attackerID": "tempz74h448",
      "attackerHP": 13,
      "defenderID": "tempuctmwl8",
      "defenderHP": 17,
      "inflictedDamage": 8,
      "hitResult": "NORMAL"
    },
    {
      "eventID": 53,
      "phase": "FIGHT",
      "attackerID": "tempz74h448",
      "attackerHP": 13,
      "defenderID": "tempuctmwl8",
      "defenderHP": 11,
      "inflictedDamage": 6,
      "hitResult": "NORMAL"
    },
    {
      "eventID": 54,
      "phase": "FIGHT",
      "attackerID": "tempuctmwl8",
      "attackerHP": 11,
      "defenderID": "tempz74h448",
      "defenderHP": 13,
      "inflictedDamage": 0,
      "hitResult": "BLOCKED"
    },
    {
      "eventID": 55,
      "phase": "FIGHT",
      "attackerID": "tempuctmwl8",
      "attackerHP": 11,
      "defenderID": "tempz74h448",
      "defenderHP": 5,
      "inflictedDamage": 8,
      "hitResult": "CRITICAL"
    },
    {
      "eventID": 56,
      "phase": "FIGHT",
      "attackerID": "tempuctmwl8",
      "attackerHP": 11,
      "defenderID": "tempz74h448",
      "defenderHP": 5,
      "inflictedDamage": 0,
      "hitResult": "BLOCKED"
    },
    {
      "eventID": 57,
      "phase": "FIGHT",
      "attackerID": "tempz74h448",
      "attackerHP": 5,
      "defenderID": "tempuctmwl8",
      "defenderHP": 11,
      "inflictedDamage": 0,
      "hitResult": "DODGED"
    },
    {
      "eventID": 58,
      "phase": "FIGHT",
      "attackerID": "tempz74h448",
      "attackerHP": 5,
      "defenderID": "tempuctmwl8",
      "defenderHP": 11,
      "inflictedDamage": 0,
      "hitResult": "DODGED"
    },
    {
      "eventID": 59,
      "phase": "FIGHT",
      "attackerID": "tempuctmwl8",
      "attackerHP": 11,
      "defenderID": "tempz74h448",
      "defenderHP": 3,
      "inflictedDamage": 2,
      "hitResult": "NORMAL"
    },
    {
      "eventID": 60,
      "phase": "FIGHT",
      "attackerID": "tempuctmwl8",
      "attackerHP": 11,
      "defenderID": "tempz74h448",
      "defenderHP": 3,
      "inflictedDamage": 0,
      "hitResult": "BLOCKED"
    },
    {
      "eventID": 61,
      "phase": "FIGHT",
      "attackerID": "tempuctmwl8",
      "attackerHP": 11,
      "defenderID": "tempz74h448",
      "defenderHP": 1,
      "inflictedDamage": 2,
      "hitResult": "NORMAL"
    },
    {
      "eventID": 62,
      "phase": "FIGHT",
      "attackerID": "tempuctmwl8",
      "attackerHP": 11,
      "defenderID": "tempz74h448",
      "defenderHP": 1,
      "inflictedDamage": 0,
      "hitResult": "BLOCKED"
    },
    {
      "eventID": 63,
      "phase": "FIGHT_ENDED",
      "attackerID": "tempuctmwl8",
      "attackerHP": 11,
      "defenderID": "tempz74h448",
      "defenderHP": -1,
      "inflictedDamage": 2,
      "hitResult": "NORMAL"
    }
  ]
}
```
