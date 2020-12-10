import React, { ChangeEvent, FormEvent } from 'react'
import { connect } from 'react-redux'
import { withStyles, createStyles, Theme } from "@material-ui/core/styles";

import { GlobalState } from '../redux/store'
import { createRoom, connectToRoom } from '../redux/room/actions'
import { hadInteraction } from '../redux/user/actions'

import Typography from '@material-ui/core/Typography'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import IconButton from '@material-ui/core/IconButton'
import ArrowForwardIcon from '@material-ui/icons/ArrowForward'

class RoomButtons extends React.Component<Props, State> {

  state = {
    roomname: ''
  }

  createRoom = () => {
    this.props.hadInteraction()
    this.props.createRoom()
  }

  inputChanged = (event: ChangeEvent<HTMLInputElement>) => {
    const roomname = event.target.value
    this.setState({ roomname })
  }

  connect = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault()
    this.props.hadInteraction()
    this.props.connectToRoom(this.state.roomname)
  }
  
  render() {
    const { classes } = this.props
    return (
      <div className={classes.buttons}>
        <Typography variant='h4' className={classes.text}>
          Create a Room
        </Typography>
        <Button
          onClick={this.createRoom}
          variant='contained'
          color='primary'
        >
          Create
        </Button>
        <Typography variant='h6' className={classes.text}>
          ~ Or ~
        </Typography>
        <Typography variant='h4' className={classes.text}>
          Join a Room
        </Typography>
        <form onSubmit={this.connect} className={classes.form}>
          <TextField 
            onChange={this.inputChanged}
            value={this.state.roomname}
            label='Room name'
            className={classes.roomInput}
          />
          <IconButton type='submit' className={classes.joinBtn}>
            <ArrowForwardIcon />
          </IconButton>
        </form>
      </div>
    )
  }
}

interface Props {
  createRoom: typeof createRoom
  connectToRoom: typeof connectToRoom
  hadInteraction: typeof hadInteraction
  classes: any
}

interface State { 
  roomname: string
}

const mapStateToProps = (state: GlobalState) => ({ })

const mapDispatchToProps = {
  createRoom,
  connectToRoom,
  hadInteraction,
}


const styles = (theme: Theme) =>
  createStyles({
    buttons: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
    },
    text: {
      margin: 16,
      textAlign: 'center'
    },
    form: {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      '& .MuiFormLabel-root': {
        color: 'white'
      },
      '& .MuiInputBase-root': {
        borderBottom: '1px solid white'
      },
    },
    roomInput: {
      color: 'white',
      '& ::after': {
        borderBottom: '2px solid white'
      },
      '& input': {
        color: 'white'
      }

    },
    joinBtn: {
      color: 'white'
    }
  });

export default connect(mapStateToProps, mapDispatchToProps)(
  withStyles(styles)(RoomButtons)
)
