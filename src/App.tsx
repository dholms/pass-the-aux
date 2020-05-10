import React from 'react'

import { connect } from 'react-redux'
import { GlobalState } from './redux/store'
import { startListening } from './redux/track/actions'

import Login from './Login'
import { Track } from './spotify/types'
import Player from './Player'

class App extends React.Component<Props, State> {

  componentDidUpdate(prevProps: Props){
    if(this.props.token !== null && this.props.token !== prevProps.token) {
      this.props.startListening()
    }
  }

  componentDidMount(){
    if(this.props.token){
      this.props.startListening()
    }
  }

  render() {
    const { token, currTrack, progress, paused } = this.props
    // return <Player />
    if(!token){
      return <Login />
    }
    return (
      <div>
        <h1>Currently Listening</h1>
        {currTrack === null && 
          <h2>None</h2>
        }
        {currTrack !== null &&
          <div>
            <img src={currTrack.img} />
            <h2>{currTrack.name}</h2>
            <h4>{currTrack.artist} - {currTrack.album}</h4>
            <h6>{ paused ? "Paused" : "Playing" }</h6>
            <h6>progress: { progress } </h6>
          </div>
        }
      </div>
    )
  }
}

interface Props {
  token: string | null
  currTrack: Track | null
  progress: number | null
  paused: boolean
  startListening: typeof startListening
}

interface State { }

const mapStateToProps = (state: GlobalState) => ({
  token: state.user.token,
  currTrack: state.track.curr,
  progress: state.track.progress,
  paused: state.track.paused
})

const mapDispatchToProps = {
  startListening
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
