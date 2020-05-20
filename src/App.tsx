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
import HelpButton from './components/HelpButton'

import background from './assets/background.jpg'

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
      <div className={classes.main}>
        <Container className={classes.container}>
          <HelpButton classes={{main: classes.helpBtn}}/>
          <Typography variant='h1' className={classes.header}>
            Pass the Aux
          </Typography>
          {elem}
        </Container>
      </div>
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

const styles = (theme: Theme) => {
  const white = 'rgba(250, 250, 250, 0.93)'
  return createStyles({
    main: {
      backgroundImage: `url('${background}')`,
      height: '100%',
      width: '100%',
      padding: 64,
    },
    header: {
      textAlign: 'center',
      marginBottom: 64
    },
    container: {
      padding: 64,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      backgroundColor: white,
      boxShadow: `0 0 8px 16px ${white}`
    },
    helpBtn: {
      position: 'absolute',
      top: 16,
      right: 16,
      color: white
    }
  });
}

export default connect(mapStateToProps, mapDispatchToProps)(
  withStyles(styles)(App)
)
