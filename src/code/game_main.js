/**
 * this main file for run game
 */

import { Level } from './classes/level.js'
import { DOMDisplay } from './classes/domDisplay.js'
import { runLevel } from './functions/functions.js'
import { GAME_LEVELS } from './levels/levels.js'

let joon = 3
async function runGame (plans, Display) {
  for (let level = 0; level < plans.length;) {
    const status = await runLevel(new Level(plans[level]),
      Display)
    if (status === 'won') level++
    else if (joon > 0) {
      joon -= 1
      document.querySelector('.joon').innerHTML = String(joon)
      console.log(joon + 1)
    } else {
      level = 0
      joon = 3
      document.querySelector('.joon').innerHTML = String(joon)
    }
  }
  console.log("You've won!")
}
runGame(GAME_LEVELS, DOMDisplay)
