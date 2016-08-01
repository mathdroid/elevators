
export function addFloor () {
  return { type: 'ADD_FLOOR' }
}

export function addLift () {
  return { type: 'ADD_LIFT' }
}

function toggleCall (floorNum) {
  return { type: 'TOGGLE_CALL', floorNum }
}

function setFloorStatus (floorNum, status) {
  return { type: 'SET_FLOOR_STATUS', floorNum, status }
}

function setElevatorStatus (elevatorId, status, target) {
  return { type: 'SET_ELEVATOR_STATUS', elevatorId, status, target }
}

function setElevatorPosition (elevatorId, floorNum) {
  return { type: 'SET_ELEVATOR_POSITION', elevatorId, floorNum }
}

export function toggleAnswer (floorNum) {
  return { type: 'TOGGLE_ANSWER', floorNum }
}

function shouldToggleCall (state, floorNum) {
  const floors = state.floors
  const stayingLifts = state.lifts.filter((lift, index) => (lift.position === floorNum) && (lift.state === 'STAYING'))
  if (stayingLifts.length === 0 && !floors[floors.length - floorNum].isCalling) {
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

function callFreeElevatorTo (floorNum) {
  return (dispatch, getState) => {
    // the floor is calling!
    dispatch(toggleCall(floorNum))
    dispatch(setFloorStatus(floorNum, 'SEARCHING FOR ELEVATOR.'))
    // get free lifts and work from these
    const freeLift = getState().lifts.filter((lift, index) => {
      return lift.state === 'FREE'
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
      dispatch(setElevatorStatus(freeLift.elevatorId, 'MOVING', floorNum))
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
      dispatch(setElevatorStatus(elevatorId, 'STAYING'))
      dispatch(setFloorStatus(floorNum, `ELEVATOR ${elevatorId} IS HERE FOR 3 SECONDS.`))
      dispatch(toggleCall(floorNum))
      setTimeout(() => {
        dispatch(toggleAnswer(floorNum))
        dispatch(setFloorStatus(floorNum, 'IDLING.'))
        dispatch(setElevatorStatus(elevatorId, 'FREE'))
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
//
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
      dispatch(setElevatorStatus(elevatorId, 'MOVING', closestWaitingFloor.floorNum))
      return dispatch(moveElevatorTo(elevatorId, closestWaitingFloor.floorNum))
    } else {
      return Promise.resolve()
    }
  }
}
//
// export function setFloorStatus (floorNum, status) {
//   return { type: 'SET_FLOOR_STATUS', floorNum, status }
// }
//
// export function setElevatorStatus (elevatorId, status, target) {
//   return { type: 'SET_ELEVATOR_STATUS', elevatorId, status, target }
// }
//
// export function setElevatorPosition (elevatorId, floorNum) {
//   return { type: 'SET_ELEVATOR_POSITION', elevatorId, floorNum }
// }
