import React, { PropTypes, Component } from 'react'

export default class Lifts extends Component {

  render () {
    const lifts = [].concat(this.props.lifts)
    const addLift = this.props.addLift
    return (
      <div>
        <button onClick={() => {
          addLift()
        }}>
          Add Lift
        </button>
        <ul>
          {lifts.map((lift, i) =>
            <li key={i}>
              {`LIFT ${i + 1}: ${lift.state} in floor ${lift.position}${lift.state === 'MOVING' ? ', moving to floor ' + lift.target : '.'}`}
            </li>
          )}
        </ul>
      </div>
    )
  }
}

Lifts.propTypes = {
  lifts: PropTypes.array.isRequired,
  addLift: PropTypes.func.isRequired
}
