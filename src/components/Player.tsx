import React from "react";
import { connect } from "react-redux";
import { withStyles, createStyles, Theme } from "@material-ui/core/styles";

import { GlobalState } from "../redux/store";
import { updateTrack } from "../redux/track/actions";

import { Track } from "../spotify/types";

import Typography from "@material-ui/core/Typography";

import MemberList from "./MemberList";
import emptyAlbum from "../assets/emptyAlbum.png";

class Player extends React.Component<Props, State> {
  render() {
    const { track, classes } = this.props;
    return (
      <div className={classes.main}>
        <div className={classes.auxDetails}>
        </div>
        <div className={classes.player}>
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
    player: {
      display: 'flex',
      flexDirection: 'row',
      '& > div': {
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
      width: 450,
      borderRadius: 5
    },
  })

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(Player));
