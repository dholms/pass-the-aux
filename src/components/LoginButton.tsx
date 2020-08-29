import React from "react";
import { connect } from "react-redux";
import { withStyles, createStyles, Theme } from "@material-ui/core/styles";

import { gotUserToken } from "../redux/user/actions";
import { GlobalState } from "../redux/store";

import spotify from "../spotify";

import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import { connectToRoom } from "../redux/room/actions";

class LoginButton extends React.Component<Props> {

  promptLogin() {
    spotify.loginRedirect();
  }

  render() {
    const { classes } = this.props;
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
  gotUserToken: typeof gotUserToken;
  connectToRoom: typeof connectToRoom;
  classes: any;
}

const mapStateToProps = (state: GlobalState) => ({ });

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
)(withStyles(styles)(LoginButton));
