import React, { ChangeEvent, FormEvent } from 'react'
import { connect } from 'react-redux'
import { withStyles, createStyles, Theme } from "@material-ui/core/styles";

import { GlobalState } from '../redux/store'
import { createRoom, connectToRoom } from '../redux/room/actions'

import Container from '@material-ui/core/Container'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'

class JoinRoom extends React.Component<Props, State> {

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

  connect = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault()
    this.props.connectToRoom(this.state.roomname)
  }
  
  render() {
    return (
      <Container>
        <Button onClick={this.props.createRoom}>Create Room</Button>
        <br />
        <form onSubmit={this.connect}>
          <input 
            onChange={this.inputChanged}
            value={this.state.roomname}
            placeholder='room'
          />
          <Button type='submit'>Join</Button>
        </form>
      </Container>
    )
  }
}

interface Props {
  roomname: string  | null
  createRoom: typeof createRoom
  connectToRoom: typeof connectToRoom
}

interface State { 
  roomname: string
}

const mapStateToProps = (state: GlobalState) => ({
  roomname: state.room.name,
})

const mapDispatchToProps = {
  createRoom,
  connectToRoom,
}


const styles = (theme: Theme) =>
  createStyles({
    header: {
      textAlign: 'center',
      marginTop: 128,
      marginBottom: 64
    },
    container: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center'
    },
    spotifyButton: {
      color: '#FFF',
      borderRadius: 32,
      fontSize: 18,
      padding: '16px 32px'
    }
  });

export default connect(mapStateToProps, mapDispatchToProps)(
  withStyles(styles)(JoinRoom)
)
