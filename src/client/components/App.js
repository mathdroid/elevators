import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'

import {
  addLift,
  addFloor,
  toggleCall,
  toggleCallIfNeeded
} from '../../redux/actions'

import Floors from './Floors'
import Lifts from './Lifts'

class App extends Component {
  constructor (props) {
    super(props)
    this.handleButtonClick = this.handleButtonClick.bind(this)
  }

  componentDidMount () {
    const { dispatch } = this.props
    window.controls = {
      checkButtonInFloor: (floor) => (this.props.floors[floor - 1]) ? this.props.floors[floor - 1].isCalling : () => {},
      activateButton: (floor) => {
        dispatch(toggleCallIfNeeded(floor))
      }
    }
  }

  componentWillMount () {

  }

  componentWillReceiveProps (nextProps) {
  }

  handleButtonClick (floor) {
    this.props.dispatch(toggleCallIfNeeded(floor))
  }

  render () {
    const { dispatch, floors, lifts } = this.props
    return (
      <div>
        It is {new Date().toLocaleTimeString()}.
        <button onClick={() => {
            dispatch(addFloor())
          }}>
          Add Floor
        </button>
        <Floors floors={floors}
          onClick={this.handleButtonClick} />
        <button onClick={() => {
            dispatch(addLift())
          }}>
          Add Lift
        </button>
        <Lifts lifts={lifts} />
      </div>
    )
  }
}

App.propTypes = {
  dispatch: PropTypes.func.isRequired,
  lifts: PropTypes.array.isRequired,
  floors: PropTypes.array.isRequired
}

function mapStateToProps (state) {
  const { lifts, floors } = state
  return {
    lifts,
    floors
  }
}

export default connect(mapStateToProps)(App)
