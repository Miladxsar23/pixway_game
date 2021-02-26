/**
 * important and helper Functions in game
 */
// overlap function
import { State } from '../classes/state.js'
function overlap (actor1, actor2) {
  return actor1.pos.x + actor1.size.x > actor2.pos.x &&
           actor1.pos.x < actor2.pos.x + actor2.size.x &&
           actor1.pos.y + actor1.size.y > actor2.pos.y &&
           actor1.pos.y < actor2.pos.y + actor2.size.y
}
// trackkeys function
function trackKeys (keys) {
  const down = Object.create(null)
  function track (event) {
    if (keys.includes(event.key)) {
      down[event.key] = event.type === 'keydown'
      event.preventDefault()
    }
  }

  window.addEventListener('keydown', track)
  window.addEventListener('keyup', track)
  window.addEventListener('keydown', event => {
    if (event.keyCode === 38) {
      document.getElementById('audio_jump').play()
      document.getElementById('audio_jump').currentTime = 0
    }
  })

  down.unregistery = () => {
    window.removeEventListener('keydown', track)
    window.removeEventListener('keyup', track)
  }
  return down
}

// run animation wrapper function
function runAnimation (frameFunc) {
  let lastTime = null
  function frame (time) {
    if (lastTime != null) {
      const timeStep = escKey % 2 !== 0 ? 0 : Math.min(time - lastTime, 100) / 1000
      if (frameFunc(timeStep) === false) return
    }
    lastTime = time
    requestAnimationFrame(frame)
  }
  requestAnimationFrame(frame)
}
// define escKey for track escape key state
let escKey = 0
let arrowKeys = trackKeys(['ArrowLeft', 'ArrowRight', 'ArrowUp'])

// run level function -> return promise
function runLevel (level, Display) {
  const display = new Display(document.body, level)
  let state = State.start(level)
  let ending = 1.7
  // handler function for escape key
  function escHandler (event) {
    if (event.key === 'Escape') {
      escKey += 1
      if (escKey % 2 !== 0) arrowKeys.unregistery()
      else arrowKeys = trackKeys(['ArrowLeft', 'ArrowRight', 'ArrowUp'])
    }
  }
  window.addEventListener('keydown', escHandler)
  arrowKeys = trackKeys(['ArrowLeft', 'ArrowRight', 'ArrowUp'])
  // return promise
  return new Promise(resolve => {
    runAnimation(time => {
      state = state.update(time, arrowKeys)
      display.syncState(state)
      if (state.status === 'playing') {
        return true
      } else if (ending > 0) {
        ending -= time
        return true
      } else {
        display.clear()
        resolve(state.status)
        window.removeEventListener('keydown', escHandler)
        arrowKeys.unregistery()
        return false
      }
    })
  })
}
export { overlap, trackKeys, runAnimation, runLevel, escKey, arrowKeys }
