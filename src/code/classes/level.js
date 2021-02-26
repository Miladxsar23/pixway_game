/**
 * this is level class for create the levels of game
 */
import { Player } from './player.js'
import { Lava } from './lava.js'
import { Coin } from './coin.js'
import { Monster } from './monster.js'
import { Vec } from './vec.js'
const levelChars = {
  '.': 'empty',
  '#': 'wall',
  '+': 'lava',
  '@': Player,
  o: Coin,
  '=': Lava,
  '|': Lava,
  v: Lava,
  M: Monster
}
class Level {
  constructor (plan) {
    const rows = plan.trim().split('\n').map(l => [...l])
    this.height = rows.length
    this.width = rows[0].length
    this.startActors = []

    this.rows = rows.map((row, y) => {
      return row.map((ch, x) => {
        const type = levelChars[ch]
        if (typeof type === 'string') return type
        this.startActors.push(
          type.create(new Vec(x, y), ch))
        return 'empty'
      })
    })
  }
}

//  Investigate the collision of elements
Level.prototype.touches = function (pos, size, type) {
  const xStart = Math.floor(pos.x)
  const xEnd = Math.ceil(pos.x + size.x)
  const yStart = Math.floor(pos.y)
  const yEnd = Math.ceil(pos.y + size.y)

  for (let y = yStart; y < yEnd; y++) {
    for (let x = xStart; x < xEnd; x++) {
      const isOutside = x < 0 || x >= this.width ||
                        y < 0 || y >= this.height
      const here = isOutside ? 'wall' : this.rows[y][x]
      if (here === type) return true
    }
  }
  return false
}
export { Level }
