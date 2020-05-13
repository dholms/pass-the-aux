import React from 'react'

import { connect } from 'react-redux'
import { GlobalState } from './redux/store'
import { startListening } from './redux/track/actions'

import Login from './components/Login'
import room from './room'
import spotify from './spotify'
import { Track } from './spotify/types'

import io from 'socket.io-client'
const socket = io('http://localhost:3001')




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

  resetTrack = () => {
    const uri = this.props.currTrack?.uri
    if(this.props.token && uri){
      spotify.changeTrack(this.props.token, uri, 0)
    }
  }

  create = () => {
    room.create('room', 'alice')
  }

  connect = () => {
    room.connect('room', 'bob')
  }

  trackUpdate = () => {
    room.trackUpdate({
      paused: false,
      progress: 420,
      track: {
        uri: 'uri',
        name: 'bob',
        artist: 'blah',
        album: 'alb',
        img: 'img link'
      }
    })
  }



  render() {
    return (
      <div>
        <button onClick={this.create}>Create</button>
        <button onClick={this.connect}>Connect</button>
        <button onClick={this.trackUpdate}>Track Update</button>
      </div>
    )
    // const { token, currTrack, progress, paused } = this.props
    // if(!token){
    //   return <Login />
    // }
    // return (
    //   <div>
    //     <h1>Currently Listening</h1>
    //     <button onClick={this.resetTrack}>Reset Track</button>
    //     {currTrack === null && 
    //       <h2>None</h2>
    //     }
    //     {currTrack !== null &&
    //       <div>
    //         <img src={currTrack.img} alt="album art" />
    //         <h2>{currTrack.name}</h2>
    //         <h4>{currTrack.artist} - {currTrack.album}</h4>
    //         <h6>{ paused ? "Paused" : "Playing" }</h6>
    //         <h6>progress: { progress } </h6>
    //       </div>
    //     }
    //   </div>
    // )
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
