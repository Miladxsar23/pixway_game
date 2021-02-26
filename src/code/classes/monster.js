/**
 * Monster class
 */
import { Vec } from './vec.js'
import { State } from './state.js'
class Monster {
  constructor (pos, speed) {
    this.pos = pos
    this.speed = speed
  }

  static create (pos) {
    return new Monster(pos.plus(new Vec(0, -1)),
      new Vec(3, 0))
  }

  get type () {
    return 'monster'
  }

  update (time, state) {
    const newPos = this.pos.plus(this.speed.times(time))
    if (!state.level.touches(newPos, this.size, 'wall')) {
      return new Monster(newPos, this.speed)
    } else {
      return new Monster(newPos, this.speed.times(-1))
    }
  }

  collide (state) {
    const player = state.player
    const bottom = player.pos.y + player.size.y
    const top = this.pos.y
    console.log(top, bottom)
    const newActors = state.actors.filter(actor => actor !== this)
    if (bottom % top < 1) {
      document.getElementById('audio_monster').play()
      return new State(state.level, newActors, state.status)
    } else {
      return new State(state.level, state.actors, 'lost')
    }
  }
}

Monster.prototype.size = new Vec(1.2, 2)
export { Monster }
