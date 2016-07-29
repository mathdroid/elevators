import React, { PropTypes, Component } from 'react'

export default class Floors extends Component {

  render () {
    const floors = [].concat(this.props.floors)
    const { onClick } = this.props

    return (
      <ul>
        {floors.sort((a, b) => b.floorNum - a.floorNum).map((floor, i) =>
          <li key={floors.length - floor.floorNum}>
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
