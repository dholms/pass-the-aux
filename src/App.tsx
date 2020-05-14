import React from 'react'

import { connect } from 'react-redux'
import { GlobalState } from './redux/store'
import { createRoom, connectToRoom } from './redux/room/actions'

import Login from './components/Login'
import Player from './components/Player'
import JoinRoom from './components/JoinRoom'

class App extends React.Component<Props, State> {
  render() {
    const { token, roomname } = this.props
    if(!token){
      return <Login />
    }
    if(roomname !== null){
      return <Player />
    }
    return <JoinRoom />
  }
}

interface Props {
  token: string | null
  roomname: string  | null
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
