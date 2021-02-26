/**
 * state class for Check the status of the game frame by frame
 */
import { overlap } from '../functions/functions.js'
class State {
  constructor (level, actors, status) {
    this.level = level
    this.actors = actors
    this.status = status
  }

  static start (level) {
    return new State(level, level.startActors, 'playing')
  }

  get player () {
    return this.actors.find(a => a.type === 'player')
  }
}

//  update function for state of game
State.prototype.update = function (time, keys) {
  const actors = this.actors
    .map(actor => actor.update(time, this, keys))
  let newState = new State(this.level, actors, this.status)

  if (newState.status !== 'playing') return newState

  const player = newState.player
  if (this.level.touches(player.pos, player.size, 'lava')) {
    document.getElementById('audio_lose').play()
    return new State(this.level, actors, 'lost')
  }

  for (const actor of actors) {
    if (actor !== player && overlap(actor, player)) {
      newState = actor.collide(newState)
    }
  }
  return newState
}
export { State }
