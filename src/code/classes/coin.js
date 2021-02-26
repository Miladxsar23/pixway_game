/**
 * Coin class
 */
import { Vec } from './vec.js'
import { State } from './state.js'
class Coin {
  constructor (pos, basePos, wobble) {
    this.pos = pos
    this.basePos = basePos
    this.wobble = wobble
  }

  get type () { return 'coin' }

  static create (pos) {
    const basePos = pos.plus(new Vec(0.2, 0.1))
    return new Coin(basePos, basePos,
      Math.random() * Math.PI * 2)
  }
}
// coin size
Coin.prototype.size = new Vec(0.6, 0.6)

// coin collide simulation
Coin.prototype.collide = function (state) {
  document.getElementById('audio_coin').play()
  document.getElementById('audio_coin').currentTime = 0
  const filtered = state.actors.filter(a => a !== this)
  let status = state.status
  if (!filtered.some(a => a.type === 'coin')) {
    status = 'won'
    document.getElementById('audio_win').play()
  }
  return new State(state.level, filtered, status)
}

// coin update state function frame by frame
// wobble motion simulation
const wobbleSpeed = 8; const wobbleDist = 0.07
Coin.prototype.update = function (time) {
  const wobble = this.wobble + time * wobbleSpeed
  const wobblePos = Math.sin(wobble) * wobbleDist
  return new Coin(this.basePos.plus(new Vec(0, wobblePos)),
    this.basePos, wobble)
}
export { Coin }
