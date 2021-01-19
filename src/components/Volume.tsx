import React, { ChangeEvent } from "react";
import { connect } from "react-redux";
import { withStyles, createStyles, Theme } from "@material-ui/core/styles";

import { GlobalState } from "../redux/store";
import { setVolume } from "../redux/room/actions";

import Grid from '@material-ui/core/Grid';
import Slider from '@material-ui/core/Slider';
import VolumeDown from '@material-ui/icons/VolumeDown';
import VolumeUp from '@material-ui/icons/VolumeUp';

class Volume extends React.Component<Props, State> {

  state = {

  }

  handleChange = (_evt: ChangeEvent<{}>, volume: number | number[]) => {
    const toSet = typeof volume === 'number' ? volume : volume[0] || 50
    this.props.setVolume(toSet)
  }

  render() {
    return (
        <Grid container spacing={2}>
          <Grid item>
            <VolumeDown />
          </Grid>
          <Grid item xs>
            <Slider value={this.props.volume} onChange={this.handleChange} aria-labelledby="continuous-slider" />
          </Grid>
          <Grid item>
            <VolumeUp />
          </Grid>
        </Grid>
    )
  }
}

interface Props {
  volume: number
  setVolume: typeof setVolume
  classes: any;
}

interface State { }

const mapStateToProps = (state: GlobalState) => ({
  volume: state.room.volume,
});

const mapDispatchToProps = { 
  setVolume
};

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
)(withStyles(styles)(Volume));
