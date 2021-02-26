/**
 * Player class for create player of game
 */
import { Vec } from './vec.js'
class Player {
  constructor (pos, speed, jump) {
    this.pos = pos
    this.speed = speed
    this.jump = jump
  }

  get type () { return 'player' }

  static create (pos) {
    return new Player(pos.plus(new Vec(0, -0.5)),
      new Vec(0, 0))
  }
}
Player.prototype.size = new Vec(0.8, 1.5)

//   update state of palyer frame by frame and Simulation of motion and gravity

const playerXSpeed = 7
const gravity = 30
const jumpSpeed = 17

Player.prototype.update = function (time, state, keys) {
  let xSpeed = 0
  if (keys.ArrowLeft) xSpeed -= playerXSpeed
  if (keys.ArrowRight) xSpeed += playerXSpeed
  let pos = this.pos
  let jump
  const movedX = pos.plus(new Vec(xSpeed * time, 0))
  if (!state.level.touches(movedX, this.size, 'wall')) {
    pos = movedX
  }

  let ySpeed = this.speed.y + time * gravity
  const movedY = pos.plus(new Vec(0, ySpeed * time))
  if (!state.level.touches(movedY, this.size, 'wall')) {
    pos = movedY
    jump = 'player_jump'
  } else if (keys.ArrowUp && ySpeed > 0) {
    ySpeed = -jumpSpeed
    jump = 'player_jump'
  } else {
    ySpeed = 0
  }
  return new Player(pos, new Vec(xSpeed, ySpeed), jump)
}
export { Player }
