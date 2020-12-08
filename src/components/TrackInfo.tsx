import React from "react";
import { connect } from "react-redux";
import { withStyles, createStyles, Theme } from "@material-ui/core/styles";

import { GlobalState } from "../redux/store";

import { PlayerState } from "../spotify/types";

import Typography from "@material-ui/core/Typography";

import emptyAlbum from "../assets/emptyAlbum.png";

class TrackInfo extends React.Component<Props, State> {
  render() {
    const { playerState, classes } = this.props;
    const track = playerState?.track_window?.current_track
    const img = track?.album?.images[0]?.url
    const artist = track?.artists
      .map(artist => artist.name)
      .join(', ')
    const album = track?.album.name || ''
    return (
      <div className={classes.main}>
        <img
          src={img ? img : emptyAlbum}
          alt="album art"
          className={classes.img}
        />
        <Typography>
          <strong>{track ? track.name : ""}</strong>
        </Typography>
        <Typography>
          <em>{artist} - {album}</em>
        </Typography>
      </div>
    )
  }
}

interface Props {
  playerState: PlayerState | null;
  classes: any;
}

interface State {}

const mapStateToProps = (state: GlobalState) => ({
  playerState: state.room.playerState,
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
