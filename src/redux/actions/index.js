/*
 * action types
 */

export const ADD_FLOOR = 'ADD_FLOOR'
export const ADD_LIFT = 'ADD_LIFT'
export const TOGGLE_CALL = 'TOGGLE_CALL'
export const TOGGLE_ANSWER = 'TOGGLE_ANSWER'
export const SET_FLOOR_STATUS = 'SET_FLOOR_STATUS'
export const SET_ELEVATOR_STATUS = 'SET_ELEVATOR_STATUS'
export const SET_ELEVATOR_POSITION = 'SET_ELEVATOR_POSITION'

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

export function toggleAnswer (floorNum) {
  return { type: TOGGLE_ANSWER, floorNum }
}

function shouldToggleCall (state, floorNum) {
  const floors = state.floors
  const stayingLifts = state.lifts.filter((lift, index) => (lift.position === floorNum) && (lift.state === ElevatorStatus.STAYING))
  if (stayingLifts.length === 0 && !floors[floorNum - 1].isCalling) {
    return true
  } else {
    return false
  }
}

export function toggleCallIfNeeded (floorNum) {
  return (dispatch, getState) => {
    if (shouldToggleCall(getState(), floorNum)) {
      return dispatch(callFreeElevatorTo(floorNum))
    } else {
      // Let the calling code know there's nothing to wait for.
      return Promise.resolve()
    }
  }
}

export function callFreeElevatorTo (floorNum) {
  return (dispatch, getState) => {
    // the floor is calling!
    dispatch(toggleCall(floorNum))
    dispatch(setFloorStatus(floorNum, 'SEARCHING FOR ELEVATOR.'))
    // get free lifts and work from these
    const freeLift = getState().lifts.filter((lift, index) => {
      return lift.state === ElevatorStatus.FREE
    }).reduce((previous, current) => {
      if (Math.abs(floorNum - current.position) < Math.abs(floorNum - previous.position)) {
        return current
      } else {
        return previous
      }
    }, {position: Number.MAX_SAFE_INTEGER, elevatorId: 0})
    // console.log(freeLift)
    if (freeLift.elevatorId > 0) {
      dispatch(toggleAnswer(floorNum))
      dispatch(setFloorStatus(floorNum, `WAITING FOR ELEVATOR ${freeLift.elevatorId}.`))
      dispatch(setElevatorStatus(freeLift.elevatorId, ElevatorStatus.MOVING, floorNum))
      return dispatch(moveElevatorTo(freeLift.elevatorId, floorNum))
    } else {
      return Promise.resolve()
    }
  }
}

function moveElevatorTo (elevatorId, floorNum) {
  // console.log(`moving elevator ${elevatorId} to ${floorNum}`)
  return (dispatch, getState) => {
    const lifts = [].concat(getState().lifts)
    const curPos = lifts[elevatorId - 1].position
    if (curPos === floorNum) {
      dispatch(setElevatorStatus(elevatorId, ElevatorStatus.STAYING))
      dispatch(setFloorStatus(floorNum, `ELEVATOR ${elevatorId} IS HERE FOR 3 SECONDS.`))
      dispatch(toggleCall(floorNum))
      setTimeout(() => {
        dispatch(toggleAnswer(floorNum))
        dispatch(setFloorStatus(floorNum, `IDLING.`))
        dispatch(setElevatorStatus(elevatorId, ElevatorStatus.FREE))
        dispatch(findWaitingFloor(elevatorId, curPos))
      }, 3000)
    } else {
      setTimeout(() => {
        dispatch(setElevatorPosition(elevatorId, (curPos < floorNum) ? curPos + 1 : curPos - 1))
        dispatch(moveElevatorTo(elevatorId, floorNum))
      }, 1000)
    }
  }
}

function findWaitingFloor (elevatorId, curPos) {
  return (dispatch, getState) => {
    const floors = getState().floors
    const closestWaitingFloor = floors.filter((floor) => {
      return floor.isCalling && !floor.isAnswered
    }).reduce((previous, current) => {
      if (Math.abs(current.floorNum - curPos) < Math.abs(previous.floorNum - curPos)) {
        return current
      } else {
        return previous
      }
    }, {floorNum: Number.MAX_SAFE_INTEGER})
    if (closestWaitingFloor.floorNum < Number.MAX_SAFE_INTEGER) {
      dispatch(toggleAnswer(closestWaitingFloor.floorNum))
      dispatch(setFloorStatus(closestWaitingFloor.floorNum, `WAITING FOR ELEVATOR ${elevatorId}.`))
      dispatch(setElevatorStatus(elevatorId, ElevatorStatus.MOVING, closestWaitingFloor.floorNum))
      return dispatch(moveElevatorTo(elevatorId, closestWaitingFloor.floorNum))
    } else {
      return Promise.resolve()
    }
  }
}

export function setFloorStatus (floorNum, status) {
  return { type: SET_FLOOR_STATUS, floorNum, status }
}

export function setElevatorStatus (elevatorId, status, target) {
  return { type: SET_ELEVATOR_STATUS, elevatorId, status, target }
}

export function setElevatorPosition (elevatorId, floorNum) {
  return { type: SET_ELEVATOR_POSITION, elevatorId, floorNum }
}
