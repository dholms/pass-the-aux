import React from "react";
import { connect } from "react-redux";
import { withStyles, createStyles, Theme } from "@material-ui/core/styles";

import { GlobalState } from "../redux/store";

import { Track } from "../spotify/types";

import Typography from "@material-ui/core/Typography";

import emptyAlbum from "../assets/emptyAlbum.png";

class TrackInfo extends React.Component<Props, State> {
  render() {
    const { track, classes } = this.props;
    return (
      <div className={classes.main}>
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
    )
  }
}

interface Props {
  track: Track | null;
  classes: any;
}

interface State {}

const mapStateToProps = (state: GlobalState) => ({
  track: state.track.curr,
});

const mapDispatchToProps = { };

const styles = (theme: Theme) =>
  createStyles({
    main: {
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
)(withStyles(styles)(TrackInfo));
