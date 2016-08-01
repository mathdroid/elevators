import React, { PropTypes, Component } from 'react'

export default class Floors extends Component {

  render () {
    const floors = [].concat(this.props.floors)
    const { onClick, addFloor, toggleCallIfNeeded } = this.props

    return (
      <div>
        <button onClick={() => {
            addFloor()
          }}>
          Add Floor
        </button>
        <ul>
          {floors.map((floor, i) =>
            <li key={i}>
              <button onClick={() => {
                toggleCallIfNeeded(floor.floorNum)
              }} disabled={floor.isCalling}>CALL</button> {`Floor ${floor.floorNum}: ${floor.state}`}
            </li>
          )}
        </ul>
      </div>
    )
  }
}

Floors.propTypes = {
  floors: PropTypes.array.isRequired,
  addLift: PropTypes.func.isRequired,
  toggleCallIfNeeded: PropTypes.func.isRequired
}
