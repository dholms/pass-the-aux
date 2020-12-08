import { createLogic } from "redux-logic";
import { push } from 'connected-react-router'
import { ProcessOpts } from "../types";
import {
  CREATE_ROOM,
  JOINED_ROOM,
  CONNECT_TO_ROOM,
  PASS_AUX,
  joinedRoom,
  memberAdded,
  memberRemoved,
  auxPassed,
  AUX_PASSED,
  auxPassedSuccess,
  syncPlayer,
  SYNC_PLAYER,
} from "./actions";
import { updateTrack, startListening } from "../track/actions";
import RoomClient from "../../room/client";
import { PlayerState } from "../../spotify/types";
import { Member } from "../../room/types";
import spotify from "../../spotify";

const createRoomLogic = createLogic({
  type: CREATE_ROOM,
  async process({ getState, action }: ProcessOpts, dispatch, done) {
    const { name, image, token } = getState().user;
    if(token === null){
      throw new Error("No token")
    }
    const player = await spotify.createPlayer(token)
    const room = await RoomClient.create(name, image);
    dispatch(syncPlayer(room, player));
    dispatch(push(`/${room.name}`))
    done();
  },
});

const connectToRoomLogic = createLogic({
  type: CONNECT_TO_ROOM,
  async process({ getState, action }: ProcessOpts, dispatch, done) {
    // start player
    dispatch(startListening())

    const { roomname } = action.payload;
    const username = getState().user.name;

    // dont rejoin room
    const currRoom = getState().room?.name 
    if(roomname === currRoom){
      return done()
    }

    try {
      const token = getState().user.token;
      if(token === null){
        throw new Error("No token")
      }
      const player = await spotify.createPlayer(token)
      const room = await RoomClient.connect(roomname, username);

      dispatch(syncPlayer(room, player))
      done();
    } catch (e) {
      console.warn(e);
      // Send them back to the start
      window.location.href = window.location.origin;
    }
  },
});

const syncPlayerLogic = createLogic({
  type: SYNC_PLAYER,
  warnTimeout: 0,
  async process({ getState, action }: ProcessOpts, dispatch, done) {
    const { room, player } = action.payload;
    room.onTrackUpdate = (data: PlayerState) => {
      const roomState = getState().room;
      if (roomState.userId !== roomState.leader) {
        dispatch(updateTrack(data));
      }
    };
    room.onMemberAdded = async (member: Member) => {
      dispatch(memberAdded(member))
      const playerState = await getState().track.player?.getCurrentState()
      if(playerState) {
        room.updateTrack(playerState)
      }
    }
    room.onMemberRemoved = (id: string) => dispatch(memberRemoved(id));
    room.onAuxPassed = (id: string) => dispatch(auxPassed(id));
  },
});

const passAuxLogic = createLogic({
  type: PASS_AUX,
  async process({ getState, action }: ProcessOpts, dispatch, done) {
    const id = action.payload.id;
    const room = getState().room.room;
    if (room) {
      room.passAux(id);
    }
    done();
  },
});

const auxPassedLogic = createLogic({
  type: AUX_PASSED,
  async process({ getState, action }: ProcessOpts, dispatch, done) {
    // const { userId, leader } = getState().room;
    const newLeader = action.payload.id;
    // if (userId === leader) {
      // dispatch(stopListening());
    // }
    // if (userId === newLeader) {
    //   dispatch(startListening());
    // }
    dispatch(auxPassedSuccess(newLeader));
    done();
  },
});

export default [
  createRoomLogic,
  connectToRoomLogic,
  syncPlayerLogic,
  passAuxLogic,
  auxPassedLogic,
];
