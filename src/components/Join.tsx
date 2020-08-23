import { default as React, useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import { connectToRoom } from "../redux/room/actions";
import { GlobalState } from "../redux/store";
import AppStyle from "./AppStyle";
import { connect } from "react-redux";
import Player from "./Player";

const mapDispatchToProps = {
  connectToRoom,
};
const mapStateToProps = (state: GlobalState) => ({
  token: state.user.token,
  roomname: state.room.name,
});

interface ConnectedProps {
  token: string | null;
  roomname: string | null;
  connectToRoom: typeof connectToRoom;
}

const Join = ({ connectToRoom }: ConnectedProps) => {
  let { id } = useParams();

  useEffect(() => {
    try {
      id && connectToRoom(id);
    } catch (e) {
      console.error(e);
    }
  }, []);

  return <Player />;
};

export default connect(mapStateToProps, mapDispatchToProps)(Join);
