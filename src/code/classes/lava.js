/**
 * lava class for create static or dynamic LAVA
 */
import { Vec } from './vec.js'
import { State } from './state.js'
class Lava {
  constructor (pos, speed, design, reset) {
    this.pos = pos
    this.speed = speed
    this.design = design
    this.reset = reset
  }

  get type () { return 'lava' }

  static create (pos, ch) {
    if (ch === '=') {
      return new Lava(pos, new Vec(2, 0), 'ofoghi')
    } else if (ch === '|') {
      return new Lava(pos, new Vec(0, 2), 'amoodi')
    } else if (ch === 'v') {
      return new Lava(pos, new Vec(0, 3), 'amoodi', pos)
    }
  }
}
// size of lava
Lava.prototype.size = new Vec(1, 1)

// Collision simulation with collide function
Lava.prototype.collide = function (state) {
  document.getElementById('audio_lose').play()
  return new State(state.level, state.actors, 'lost')
}

// lava update state frame by frame
Lava.prototype.update = function (time, state) {
  const newPos = this.pos.plus(this.speed.times(time))
  if (!state.level.touches(newPos, this.size, 'wall')) {
    return new Lava(newPos, this.speed, this.design, this.reset)
  } else if (this.reset) {
    return new Lava(this.reset, this.speed, this.design, this.reset)
  } else {
    return new Lava(this.pos, this.speed.times(-1), this.design)
  }
}
export { Lava }
