import React from "react";
import { connect } from "react-redux";
import { withStyles, createStyles, Theme } from "@material-ui/core/styles";

import { gotUserToken } from "../redux/user/actions";
import { GlobalState } from "../redux/store";

import querystring from "querystring";
import spotify from "../spotify";

import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import { createRoom, connectToRoom } from "../redux/room/actions";
import { withRouter, RouteComponentProps } from "react-router-dom";

class LoginButton extends React.Component<Props & RouteComponentProps> {
  componentDidMount() {
    // Parse spotify query string that includes token.
    if (window.location.pathname.indexOf("callback") > -1) {
      const qs = querystring.parse(window.location.hash.slice(1));
      if (qs.access_token && typeof qs.access_token === "string") {
        this.props.gotUserToken(qs.access_token);
        if (qs.state) {
          const redirectTo = JSON.parse(String(qs.state)).redirectToPath;
          console.log("Redirecting to", redirectTo, qs);
          const { state, ...rest } = qs;
          redirectTo && this.props.history.push(redirectTo, rest);
        }
      }
    }
  }

  promptLogin() {
    spotify.loginRedirect();
  }

  render() {
    const { classes } = this.props;
    if (this.props.loggedIn) return null;
    return (
      <div className={classes.main}>
        <Typography variant="h4">Listen to music with friends</Typography>
        <Button
          onClick={this.promptLogin}
          className={classes.spotifyButton}
          color="primary"
          variant="contained"
        >
          Login with Spotify
        </Button>
        <Typography variant="subtitle1" className={classes.details}>
          <strong>Login with Spotify</strong> and create a room.
          <br />
          When a friend joins that room, their Spotify{" "}
          <strong>automatically syncs</strong> with yours.
          <br />
          Tired of DJing? <strong>Pass the aux</strong> to a friend!
        </Typography>
      </div>
    );
  }
}

interface Props {
  loggedIn: boolean;
  gotUserToken: typeof gotUserToken;
  classes: any;
  connectToRoom: Function;
  history: any;
}

const mapStateToProps = (state: GlobalState) => ({
  loggedIn: state.user.token !== null,
});

const mapDispatchToProps = {
  gotUserToken,
  connectToRoom,
};

const styles = (theme: Theme) =>
  createStyles({
    main: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      "& > *": {
        marginBottom: 32,
        textAlign: "center",
      },
    },
    spotifyButton: {
      color: "#FFF",
      borderRadius: 32,
      fontSize: 18,
      padding: "16px 32px",
    },
    details: {
      fontSize: 20
    }
  });

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(withRouter(LoginButton)));
