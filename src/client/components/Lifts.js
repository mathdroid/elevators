import React, { PropTypes, Component } from 'react'

export default class Lifts extends Component {

  render () {
    const lifts = [].concat(this.props.lifts)

    return (
      <ul>
        {lifts.map((lift, i) =>
          <li key={i}>
            {`LIFT ${i + 1}: ${lift.state} in position ${lift.position}${lift.state === 'MOVING' ? 'to ' + lift.target : '.'}`}
          </li>
        )}
      </ul>
    )
  }
}

Lifts.propTypes = {
  lifts: PropTypes.array.isRequired
}
