import React, { PropTypes, Component } from 'react'

export default class Floors extends Component {

  render () {
    const floors = [].concat(this.props.floors)
    const { onClick } = this.props

    return (
      <ul>
        {floors.map((floor, i) =>
          <li key={i}>
            <button onClick={() => {
              onClick(floor.floorNum)
            }} disabled={floor.isCalling}>CALL</button> {`Floor ${floor.floorNum}: ${floor.state}`}
          </li>
        )}
      </ul>
    )
  }
}

Floors.propTypes = {
  floors: PropTypes.array.isRequired,
  onClick: PropTypes.func.isRequired
}
