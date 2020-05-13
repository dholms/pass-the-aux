import React from 'react'
import { connect } from 'react-redux'
import { GlobalState } from '../redux/store'
import { updateTrack } from '../redux/track/actions'

import { Track } from '../spotify/types'

import MemberList from './MemberList'

class Player extends React.Component<Props, State> {


  resetTrack = () => {
    const track = this.props.currTrack
    const { progress, paused } = this.props
    if( progress && track){
      this.props.updateTrack({
        progress,
        paused,
        track
      })
    }
    // const uri = this.props.currTrack?.uri
    // if(this.props.token && uri){
    //   spotify.changeTrack(this.props.token, uri, 0)
    // }
  }

  render() {
    const { currTrack, roomname, paused, progress } = this.props
    return (
      <div>
        <h1>Currently Listening</h1>
        <h2>Room: {roomname}</h2>
        <button onClick={this.resetTrack}>Reset Track</button>
        {currTrack === null && 
          <h2>None</h2>
        }
        {currTrack !== null &&
          <div>
            <img src={currTrack.img} alt="album art" />
            <h2>{currTrack.name}</h2>
            <h4>{currTrack.artist} - {currTrack.album}</h4>
            <h6>{ paused ? "Paused" : "Playing" }</h6>
            <h6>progress: { progress } </h6>
          </div>
        }
        <MemberList />
      </div>
    )
  }

}

interface Props {
  currTrack: Track | null
  roomname: string | null
  progress: number | null,
  paused: boolean,
  updateTrack: typeof updateTrack
}

interface State { }

const mapStateToProps = (state: GlobalState) => ({
  currTrack: state.track.curr,
  roomname: state.room.name,
  progress: state.track.progress,
  paused: state.track.paused,
})

const mapDispatchToProps = {
  updateTrack,
}

export default connect(mapStateToProps, mapDispatchToProps)(Player)
