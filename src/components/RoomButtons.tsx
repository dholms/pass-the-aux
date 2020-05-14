import React, { ChangeEvent, FormEvent } from 'react'
import { connect } from 'react-redux'
import { withStyles, createStyles, Theme } from "@material-ui/core/styles";

import { GlobalState } from '../redux/store'
import { createRoom, connectToRoom } from '../redux/room/actions'

import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'

class RoomButtons extends React.Component<Props, State> {

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
    const { classes } = this.props
    return (
      <div className={classes.buttons}>
        <Button
          onClick={this.props.createRoom}
          variant='contained'
          color='primary'
        >
          Create Room
        </Button>
        <Typography variant='h6' className={classes.or}>
          ~ Or ~
        </Typography>
        <form onSubmit={this.connect} className={classes.form}>
          <input 
            onChange={this.inputChanged}
            value={this.state.roomname}
            placeholder='Room name'
          />
          <Button 
            type='submit'
            variant='contained'
          >
            Join
          </Button>
        </form>
      </div>
    )
  }
}

interface Props {
  roomname: string  | null
  createRoom: typeof createRoom
  connectToRoom: typeof connectToRoom
  classes: any
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
    buttons: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
    },
    or: {
      margin: 16,
      textAlign: 'center'
    },
    form: {
      display: 'flex',
      flexDirection: 'column',
      '& input': {
        marginBottom: 16
      }
    }
  });

export default connect(mapStateToProps, mapDispatchToProps)(
  withStyles(styles)(RoomButtons)
)
