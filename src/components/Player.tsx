import React from "react";
import { connect } from "react-redux";
import { withStyles, createStyles, Theme } from "@material-ui/core/styles";

import Modal from '@material-ui/core/Modal'
import Button from '@material-ui/core/Button'

import { GlobalState } from "../redux/store";

import TrackInfo from "./TrackInfo";
import MemberList from "./MemberList";

import { syncPlayer, connectToRoom } from "../redux/room/actions";
import { hadInteraction } from "../redux/user/actions";
import { RouteComponentProps } from "react-router-dom";

class Player extends React.Component<Props, State> {

  state = {
    isPlaying: false
  }

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
    this.checkSync()
  }

  componentDidUpdate() {
    this.checkSync()
  }

  checkSync() {
    const { userLoaded, roomLoaded, hadInteraction } = this.props
    if(userLoaded && roomLoaded && hadInteraction && !this.state.isPlaying) {
      this.props.syncPlayer()
    }
  }

  render() {
    const { userLoaded, roomLoaded, classes } = this.props;
    if(!userLoaded || !roomLoaded) {
      return null
    }

    return (
      <div className={classes.main}>
        <Modal
          open={!this.props.hasInteracted}
          style={{ 
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Button
            onClick={this.props.hadInteraction}
            className={classes.spotifyButton}
            color="primary"
            variant="contained"
          >
            Start Listening
          </Button>
        </Modal>

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
  roomLoaded: boolean
  hasInteracted: boolean
  connectToRoom: typeof connectToRoom;
  hadInteraction: typeof hadInteraction;
  syncPlayer: typeof syncPlayer;
  classes: any;
}

interface State {
  isPlaying: boolean
}

const mapStateToProps = (state: GlobalState) => ({ 
  token: state.user.token,
  userLoaded: state.user.userLoaded,
  roomLoaded: state.room.room !== null,
  hasInteracted: state.user.hasInteracted
});

const mapDispatchToProps = {
  connectToRoom,
  hadInteraction,
  syncPlayer,
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
    },
    spotifyButton: {
      color: "#FFF",
      borderRadius: 32,
      fontSize: 18,
      padding: "16px 32px",
    }
  })

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(Player));
