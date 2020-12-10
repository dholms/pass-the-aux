import React from "react";
import { connect } from "react-redux";
import { withStyles, createStyles, Theme } from "@material-ui/core/styles";

import { GlobalState } from "../redux/store";

import TrackInfo from "./TrackInfo";
import MemberList from "./MemberList";
import { connectToRoom } from "../redux/room/actions";
import { RouteComponentProps } from "react-router-dom";

class Player extends React.Component<Props, State> {
  componentDidMount(){
    const { roomId } = this.props.match.params
    const connectAfterAuth = () => {
      if(this.props.userLoaded) {
        this.props.connectToRoom(roomId)
      } else {
        setTimeout(connectAfterAuth, 50)
      }
    }
    connectAfterAuth()
  }

  render() {
    const { token, classes } = this.props;
    if(!token) {
      return null
    }

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
  userLoaded: boolean
  connectToRoom: typeof connectToRoom;
  classes: any;
}

interface State {}

const mapStateToProps = (state: GlobalState) => ({ 
  token: state.user.token,
  userLoaded: state.user.userLoaded
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
