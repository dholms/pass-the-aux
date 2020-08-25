import React from "react";
import { connect } from "react-redux";
import { withStyles, createStyles, Theme } from "@material-ui/core/styles";

import { GlobalState } from "../redux/store";
import { updateTrack } from "../redux/track/actions";

import { Track } from "../spotify/types";

import Typography from "@material-ui/core/Typography";

import MemberList from "./MemberList";
import emptyAlbum from "../assets/emptyAlbum.png";
import { Link } from "@material-ui/core";

class Player extends React.Component<Props, State> {
  render() {
    const { track, classes } = this.props;
    return (
      <div>
        <div className={classes.auxDetails}>
          <div>Here's the aux</div>
          <Link>
            {window.location.origin}/join/{this.props.roomname}
          </Link>
        </div>
        <div className={classes.main}>
          <div className={classes.trackInfo}>
            <img
              src={track ? track.img : emptyAlbum}
              alt="album art"
              className={classes.img}
            />
            <Typography>
              <strong>{track ? track.name : ""}</strong>
            </Typography>
            <Typography>
              <em>{track ? `${track.artist} - ${track.album}` : ""}</em>
            </Typography>
          </div>

          <MemberList />
        </div>
      </div>
    );
  }
}

interface Props {
  track: Track | null;
  progress: number | null;
  paused: boolean;
  updateTrack: typeof updateTrack;
  classes: any;
  roomname: string | null;
}

interface State {}

const mapStateToProps = (state: GlobalState) => ({
  track: state.track.curr,
  progress: state.track.progress,
  paused: state.track.paused,
  roomname: state.room.name,
});

const mapDispatchToProps = {
  updateTrack,
};

const styles = (theme: Theme) =>
  createStyles({
    main: {
      display: "flex",
      flexDirection: "row",
      "& > div": {
        marginLeft: 16,
        marginRight: 16,
      },
      justifyContent: "center",
      flexWrap: "wrap",
    },
    trackInfo: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
    },
    img: {
      minWidth: 450,
      maxWidth: 450,
      "-webkit-box-shadow": "3px 3px 6px 0px rgba(0,0,0,0.75)",
      "-moz-box-shadow": "3px 3px 6px 0px rgba(0,0,0,0.75)",
      "box-shadow": "3px 3px 6px 0px rgba(0,0,0,0.75)",
      marginBottom: 20,
    },
    centered: {
      position: "absolute",
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
    },
    auxDetails: {
      flex: 1,
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      marginBottom: 20,
      fontSize: "120%",
    },
  });

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(Player));
