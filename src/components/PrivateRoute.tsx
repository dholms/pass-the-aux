import React from "react";
import { connect } from "react-redux";
import { Route } from "react-router-dom";
import LoginButton from "./LoginButton";
import { GlobalState } from "../redux/store";


const PrivateRoute = ({ token, path, exact, component }: Props) => (
  <Route 
    exact={exact} 
    path={path}
    component={
    token === null
      ? LoginButton
      : component
    }
  />
)

interface Props {
  token: string | null;
  exact?: boolean;
  path: string;
  component: any;
}

const mapStateToProps = (state: GlobalState) => ({
  token: state.user.token
});

const mapDispatchToProps = { }

export default connect(mapStateToProps, mapDispatchToProps)(PrivateRoute);
