import { createLogic } from "redux-logic";
import { push } from 'connected-react-router'
import { ProcessOpts } from "../types";
import {
  CREATE_ROOM,
  CONNECT_TO_ROOM,
  PASS_AUX,
  memberAdded,
  memberRemoved,
  auxPassed,
  SYNC_PLAYER,
  trackStatus,
  updateTrack,
  UPDATE_TRACK,
  joinedRoom,
  createdPlayer,
  SET_VOLUME,
  setVolume,
} from "./actions";
import RoomClient from "../../room/client";
import { PlayerState } from "../../spotify/types";
import { Member } from "../../room/types";
import spotify, { DEBOUNCE_RANGE } from "../../spotify";

const createRoomLogic = createLogic({
  type: CREATE_ROOM,
  warnTimeout: 0,
  async process({ getState, action }: ProcessOpts, dispatch, done) {
    const { name, image, token } = getState().user;
    if(token === null){
      throw new Error("No token")
    }
    const room = await RoomClient.create(name, image);
    dispatch(joinedRoom(room));
    dispatch(push(`/${room.name}`))
  },
});

const connectToRoomLogic = createLogic({
  type: CONNECT_TO_ROOM,
  warnTimeout: 0,
  async process({ getState, action }: ProcessOpts, dispatch, done) {
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
      const room = await RoomClient.connect(roomname, username);

      dispatch(joinedRoom(room))
      dispatch(push(`/${roomname}`))
    } catch (e) {
      console.warn(e);
      // Send them back to the start
      dispatch(push('/'))
    }
  },
});

const syncPlayerLogic = createLogic({
  type: SYNC_PLAYER,
  warnTimeout: 0,
  async process({ getState, action }: ProcessOpts, dispatch, done) {
    let { room, player } = getState().room;
    if(room === null) throw new Error("Room not connected")

    if(!player) {
      player = await spotify.createPlayer(() => {
        const token = getState().user.token || ''
        return token
      })
      dispatch(createdPlayer(player))

      dispatch(setVolume(25))

      player.addListener('player_state_changed', (playerState: PlayerState) => {
        const { leader, room } = getState().room
        if(room === null){
          // TODO: Better error handling here
          throw new Error("Not connect to room")
        }
        if(leader === room.socket.id) {
          room.updateTrack(playerState)
        }
        dispatch(trackStatus(playerState))
      });
    }

    player.resume()

    if(room.lastUpdate !== null) {
      if (room.socket.id !== room.leader) {
        dispatch(updateTrack(room.lastUpdate))
      }
    }

    room.onTrackUpdate = (data: PlayerState) => {
      const roomState = getState().room;
      if (roomState.userId !== roomState.leader) {
        dispatch(updateTrack(data));
      }
    };
    room.onMemberAdded = async (member: Member) => {
      dispatch(memberAdded(member))
      const playerState = await getState().room.player?.getCurrentState()
      if(playerState && room) {
        room.updateTrack(playerState)
      }
    }
    room.onMemberRemoved = (id: string) => dispatch(memberRemoved(id));
    room.onAuxPassed = (id: string) => dispatch(auxPassed(id));
  },
});

const updateTrackLogic = createLogic({
  type: UPDATE_TRACK,
  async process({ getState, action }: ProcessOpts, dispatch, done) {
    const info: PlayerState = action.payload

    const token = getState().user.token
    if(!token){
      throw new Error("User not logged in")
    }


    const { player } = getState().room
    if(!player) {
      throw new Error("No player")
    }
    const currState = await player.getCurrentState()

    const infoUri = info.track_window.current_track.uri
    const stateUri = currState?.track_window?.current_track?.uri

    const progressDiff = Math.abs(info.position - (currState?.position || 0))
    if(info.paused && !currState?.paused){
      await player.pause()
    } else if(!info.paused && currState?.paused) {
      await player.resume()
    }

    if(infoUri !== stateUri || progressDiff > DEBOUNCE_RANGE) {
      await spotify.changeTrack(token, infoUri, info.position)
    }
    dispatch(trackStatus(info))
    done();
  }
});


const passAuxLogic = createLogic({
  type: PASS_AUX,
  async process({ getState, action }: ProcessOpts, dispatch, done) {
    const id = action.payload.id;
    const room = getState().room.room;
    if (room) {
      room.passAux(id);
      dispatch(auxPassed(id))
    }
    done();
  },
});


const setVolumeLogic = createLogic({
  type: SET_VOLUME,
  async process({ getState, action }: ProcessOpts, dispatch, done) {
    const { volume } = action.payload;
    const player = getState().room.player;
    if (player) {
      // browser is much louder than spotify so we convert volume to an exponential curve for more control at lower volumes
      player.setVolume(Math.pow(volume/100, 1.75))
    }
    done();
  },
});


export default [
  createRoomLogic,
  connectToRoomLogic,
  syncPlayerLogic,
  updateTrackLogic,
  passAuxLogic,
  setVolumeLogic,
];
