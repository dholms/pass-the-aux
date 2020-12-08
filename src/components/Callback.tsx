import React from "react";
import { connect } from "react-redux";

import { gotUserCode } from "../redux/user/actions";
import { GlobalState } from "../redux/store";

import querystring from "querystring";
import { withRouter, RouteComponentProps } from "react-router-dom";

class Callback extends React.Component<Props & RouteComponentProps> {
  componentDidMount() {
    // Parse spotify query string that includes token.
    const qs = querystring.parse(window.location.search.slice(1));
    if (qs.code && typeof qs.code === "string") {
      this.props.gotUserCode(qs.code);
      if (qs.state) {
        const redirectTo = qs.state
        console.log("Redirecting to", redirectTo);
        redirectTo && this.props.history.push(redirectTo);
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
  gotUserCode: typeof gotUserCode;
  history: any;
}

const mapStateToProps = (state: GlobalState) => ({});

const mapDispatchToProps = {
  gotUserCode,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(Callback));
