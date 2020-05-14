import React, { ReactElement } from 'react'
import { connect } from 'react-redux'
import { withStyles, createStyles, Theme } from "@material-ui/core/styles";

import { GlobalState } from './redux/store'
import { createRoom, connectToRoom } from './redux/room/actions'

import Container from '@material-ui/core/Container'
import Typography from '@material-ui/core/Typography'

import LoginButton from './components/LoginButton'
import Player from './components/Player'
import RoomButtons from './components/RoomButtons'

class App extends React.Component<Props, State> {
  render() {
    const { token, roomname, classes } = this.props
    let elem: ReactElement
    if(!token){
      elem = <LoginButton />
    }else if (roomname !== null){
      elem = <Player />
    }else {
      elem = <RoomButtons />
    }
    return (
      <Container className={classes.container}>
        <Typography variant='h1' className={classes.header}>
          Pass the Aux
        </Typography>
        {elem}
      </Container>
    )
  }
}

interface Props {
  token: string | null
  roomname: string  | null
  classes: any
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

const styles = (theme: Theme) =>
  createStyles({
    header: {
      textAlign: 'center',
      marginTop: 64,
      marginBottom: 64
    },
    container: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center'
    },
  });

export default connect(mapStateToProps, mapDispatchToProps)(
  withStyles(styles)(App)
)
