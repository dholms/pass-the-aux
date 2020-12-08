import React from "react";
import { connect } from "react-redux";
import { withStyles, createStyles, Theme } from "@material-ui/core/styles";

import { GlobalState } from "../redux/store";

import TrackInfo from "./TrackInfo";
import MemberList from "./MemberList";
import { connectToRoom } from "../redux/room/actions";
import { RouteComponentProps } from "react-router-dom";
import spotify from '../spotify'

class Player extends React.Component<Props, State> {
  componentDidMount(){
    const { roomId } = this.props.match.params
    roomId && this.props.connectToRoom(roomId)
  }

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.main}>
        <TrackInfo />
        <MemberList />
      </div>
    )
  }
}

interface MatchParams {
  roomId: string
}

interface Props extends RouteComponentProps<MatchParams>{
  token: string | null
  connectToRoom: typeof connectToRoom;
  classes: any;
}

interface State {}

const mapStateToProps = (state: GlobalState) => ({ 
  token: state.user.token
});

const mapDispatchToProps = {
  connectToRoom,
};

const styles = (theme: Theme) =>
  createStyles({ 
    main: {
      display: 'flex',
      flexDirection: 'row',
      '& > div': {
        marginLeft: 16,
        marginRight: 16,
      },
      justifyContent: "center",
      flexWrap: "wrap",
    }
  })

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(Player));
