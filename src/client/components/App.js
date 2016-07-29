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
    // const { dispatch, floors } = this.props
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
    window.globs = {
      addLift: () => {
        dispatch(addLift())
      },
      addFloor: () => {
        dispatch(addFloor())
      },
      toggleCall: (floor) => {
        dispatch(toggleCall(floor))
      },
      checkButtonInFloor: (floor) => (floor - 1 < floors.length) ? floors[floor - 1].calling : () => {},
      toggleCallIfNeeded: (floor) => {
        dispatch(toggleCallIfNeeded(floor))
      }
    }
    return (
      <div>
        It is {new Date().toLocaleTimeString()}.
        <Floors floors={floors}
          onClick={this.handleButtonClick} />
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
