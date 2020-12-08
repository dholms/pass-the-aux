import React from "react";
import { connect } from "react-redux";

import { gotUserCode } from "../redux/user/actions";
import { GlobalState } from "../redux/store";

import querystring from "querystring";
import { withRouter, RouteComponentProps } from "react-router-dom";

class Callback extends React.Component<Props & RouteComponentProps> {
  componentDidMount() {
    // Parse spotify query string that includes token.
    console.log(window.location)
    const qs = querystring.parse(window.location.search.slice(1));
    console.log("QS: ", qs)
    if (qs.code && typeof qs.code === "string") {
      this.props.gotUserCode(qs.code);
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
