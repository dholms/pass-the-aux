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
} from "./actions";
import { updateTrack, startListening, stopListening } from "../track/actions";
import RoomClient from "../../room/client";
import { PlaybackInfo } from "../../spotify/types";
import { Member } from "../../room/types";

const createRoomLogic = createLogic({
  type: CREATE_ROOM,
  async process({ getState, action }: ProcessOpts, dispatch, done) {
    const { name, image } = getState().user;
    const room = await RoomClient.create(name, image);
    dispatch(joinedRoom(room));
    dispatch(push(`/${room.name}`))
    dispatch(startListening());
    done();
  },
});

const connectToRoomLogic = createLogic({
  type: CONNECT_TO_ROOM,
  async process({ getState, action }: ProcessOpts, dispatch, done) {
    const { roomname } = action.payload;
    const username = getState().user.name;

    // dont rejoin room
    const currRoom = getState().room?.name 
    if(roomname === currRoom){
      return done()
    }

    try {
      const room = await RoomClient.connect(roomname, username);
      dispatch(joinedRoom(room));
      done();
    } catch (e) {
      console.warn(e);
      // Send them back to the start
      window.location.href = window.location.origin;
    }
  },
});

const joinedRoomLogic = createLogic({
  type: JOINED_ROOM,
  warnTimeout: 0,
  async process({ getState, action }: ProcessOpts, dispatch, done) {
    const { room } = action.payload;
    room.onTrackUpdate = (data: PlaybackInfo) => {
      const roomState = getState().room;
      if (roomState.userId !== roomState.leader) {
        dispatch(updateTrack(data));
      }
    };
    room.onMemberAdded = (member: Member) => dispatch(memberAdded(member));
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
    const { userId, leader } = getState().room;
    const newLeader = action.payload.id;
    if (userId === leader) {
      dispatch(stopListening());
    }
    if (userId === newLeader) {
      dispatch(startListening());
    }
    dispatch(auxPassedSuccess(newLeader));
    done();
  },
});

export default [
  createRoomLogic,
  connectToRoomLogic,
  joinedRoomLogic,
  passAuxLogic,
  auxPassedLogic,
];
