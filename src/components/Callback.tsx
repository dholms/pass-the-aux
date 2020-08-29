import React from "react";
import { connect } from "react-redux";

import { gotUserToken } from "../redux/user/actions";
import { GlobalState } from "../redux/store";

import querystring from "querystring";
import { withRouter, RouteComponentProps } from "react-router-dom";

class Callback extends React.Component<Props & RouteComponentProps> {
  componentDidMount() {
    // Parse spotify query string that includes token.
    const qs = querystring.parse(window.location.hash.slice(1));
    if (qs.access_token && typeof qs.access_token === "string") {
      this.props.gotUserToken(qs.access_token);
      if (qs.state) {
        const redirectTo = JSON.parse(String(qs.state)).redirectToPath;
        console.log("Redirecting to", redirectTo, qs);
        const { state, ...rest } = qs;
        redirectTo && this.props.history.push(redirectTo, rest);
      }else {
        this.props.history.push('/')
      }
    }
  }

  render() {
    return null
  }
}

interface Props {
  gotUserToken: typeof gotUserToken;
  history: any;
}

const mapStateToProps = (state: GlobalState) => ({});

const mapDispatchToProps = {
  gotUserToken,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(Callback));
