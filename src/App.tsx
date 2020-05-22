import React, { ReactElement } from "react";
import { connect } from "react-redux";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import AppStyle from "./components/AppStyle";
import Join from "./components/Join";
import LoginButton from "./components/LoginButton";
import Player from "./components/Player";
import RoomButtons from "./components/RoomButtons";
import { connectToRoom, createRoom } from "./redux/room/actions";
import { GlobalState } from "./redux/store";

import Container from '@material-ui/core/Container'
import Typography from '@material-ui/core/Typography'

import HelpButton from './components/HelpButton'

import background from './assets/background.jpg'
import backgroundDark from './assets/background-dark.jpg'
import backgroundDarker from './assets/background-darker.jpg'
import { createStyles, Theme } from "@material-ui/core";



interface EnsureLoginProps {
  token?: string | null;
  children: any;
}
const EnsureLogin = ({ token, children }: EnsureLoginProps) => {
  if (!token) {
    return <LoginButton />;
  }
  return children;
};

class App extends React.Component<Props, State> {
  render() {
    const { token, roomname } = this.props;
    let elem: ReactElement;

    if (roomname !== null) {
      elem = <Player />;
    } else {
      elem = <RoomButtons />;
    }

    return (
      <Router>
        <Switch>
          <AppStyle>
            <EnsureLogin token={token}>
              <Route path={"/join/:id"}>
                <Join />
              </Route>
              <Route exact path={"/"}>
                {elem}
              </Route>
            </EnsureLogin>
          </AppStyle>
        </Switch>
      </Router>
    );
  }
}

interface Props {
  token: string | null;
  roomname: string | null;
}

interface State {}

const mapStateToProps = (state: GlobalState) => ({
  token: state.user.token,
  roomname: state.room.name,
});

const mapDispatchToProps = {
  createRoom,
  connectToRoom,
}

const styles = (theme: Theme) => 
  createStyles({
    main: {
      backgroundImage: `url('${background}')`,
      height: '100%',
      width: '100%',
    },
    header: {
      textAlign: 'center',
      marginBottom: 64,
      fontSize: 128
    },
    container: {
      padding: 64,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      color: 'white',
    },
    helpBtn: {
      position: 'absolute',
      top: 16,
      right: 16,
      color: 'white'
    }
  });

export default connect(mapStateToProps, mapDispatchToProps)(App);
