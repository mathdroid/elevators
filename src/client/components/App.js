import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'

import {
  addLift,
  addFloor,
  toggleCall
} from '../../redux/actions'

class App extends Component {
  // constructor (props) {
  //   super(props)
  // }

  componentDidMount () {
    // const { dispatch, floors } = this.props
  }

  componentWillMount () {
  }

  componentWillReceiveProps (nextProps) {
  }

  render () {
    const { dispatch, floors } = this.props
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
      checkButtonInFloor: (floor) => (floor - 1 < floors.length) ? floors[floor - 1].calling : () => {}
    }
    const time = Date.now()
    return (
      <div>
        It is {time}
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
