/*
 * action types
 */

export const ADD_FLOOR = 'ADD_FLOOR'
export const ADD_LIFT = 'ADD_LIFT'
export const TOGGLE_CALL = 'TOGGLE_CALL'
export const SET_ELEVATOR_STATUS = 'SET_ELEVATOR_STATUS'

/*
 * other constants
 */

export const ElevatorStatus = {
  MOVING: 'MOVING',
  STAYING: 'STAYING',
  FREE: 'FREE'
}

/*
 * action creators
 */

export function addFloor () {
  return { type: ADD_FLOOR }
}

export function addLift () {
  return { type: ADD_LIFT }
}

export function toggleCall (floorNum) {
  return { type: TOGGLE_CALL, floorNum }
}

export function setElevatorStatus (elevatorId, status) {
  return { type: SET_ELEVATOR_STATUS, elevatorId, status }
}
