import React, { ReactElement } from "react";
import { connect } from "react-redux";
import { withStyles, createStyles, Theme } from "@material-ui/core/styles";

import { GlobalState } from "./redux/store";
import { createRoom, connectToRoom } from "./redux/room/actions";

import LoginButton from "./components/LoginButton";
import Player from "./components/Player";
import RoomButtons from "./components/RoomButtons";

import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Join from "./components/Join";
import { S_IFBLK } from "constants";
import AppStyle from "./components/AppStyle";

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
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
