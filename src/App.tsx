import React, { ChangeEvent } from 'react'

import { connect } from 'react-redux'
import { GlobalState } from './redux/store'
import { createRoom, connectToRoom } from './redux/room/actions'

import Login from './components/Login'
import Player from './components/Player'

class App extends React.Component<Props, State> {

  state = {
    roomname: ''
  }

  createRoom = () => {
    this.props.createRoom()
  }

  inputChanged = (event: ChangeEvent<HTMLInputElement>) => {
    const roomname = event.target.value
    this.setState({ roomname })
  }

  connect = () => {
    this.props.connectToRoom(this.state.roomname)
  }
  
  render() {
    const { token, roomname } = this.props
    if(!token){
      return <Login />
    }
    if(roomname !== null){
      return <Player />
    }
    return (
      <div>
        <button onClick={this.props.createRoom}>Create Room</button>
        <br />
        <input 
          onChange={this.inputChanged}
          value={this.state.roomname}
          placeholder='room'
        />
        <button onClick={this.connect}>Join</button>
      </div>
    )
  }
}

interface Props {
  token: string | null
  roomname: string  | null
  createRoom: typeof createRoom
  connectToRoom: typeof connectToRoom
}

interface State { }

const mapStateToProps = (state: GlobalState) => ({
  token: state.user.token,
  roomname: state.room.name,
})

const mapDispatchToProps = {
  createRoom,
  connectToRoom,
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
