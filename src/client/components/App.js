import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import * as AppActionCreators from './AppActionCreators'

// import {
//   toggleCallIfNeeded
// } from '../../redux/actions'

import Floors from './Floors'
import Lifts from './Lifts'

export class App extends Component {

  componentDidMount () {
    const { dispatch } = this.props
    window.controls = {
      checkButtonInFloor: (floor) => (this.props.floors[floor - 1]) ? this.props.floors[floor - 1].isCalling : () => {},
      activateButton: (floor) => {
        let action = AppActionCreators.toggleCallIfNeeded(floor)
        dispatch(action)
      }
    }
  }

  componentWillMount () {

  }

  componentWillReceiveProps (nextProps) {
  }

  render () {
    const { dispatch, floors, lifts } = this.props
    let boundActionCreators = bindActionCreators(AppActionCreators, dispatch)
    return (
      <div>
        It is {new Date().toLocaleTimeString()}.

        <Floors floors={floors} {...boundActionCreators} />

        <Lifts lifts={lifts} {...boundActionCreators} />
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
