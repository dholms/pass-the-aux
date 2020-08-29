import React from "react";
import { Route, Switch } from "react-router-dom";
import AppStyle from "./components/AppStyle";
import Player from "./components/Player";
import PrivateRoute from "./components/PrivateRoute";
import Callback from "./components/Callback";
import RoomButtons from "./components/RoomButtons";

const App = () => (
  <Switch>
    <AppStyle>
      <Route exact path={"/callback"} component={Callback} />
      <PrivateRoute path={"/:roomId"} component={Player} />
      <PrivateRoute exact path={"/"} component={RoomButtons} />
    </AppStyle>
  </Switch>
)

export default App;
