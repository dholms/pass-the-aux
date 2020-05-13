import { createLogic } from 'redux-logic'
import { ProcessOpts } from '../types'
import { 
  CREATE_ROOM, JOINED_ROOM, CONNECT_TO_ROOM, 
  joinedRoom, memberAdded, memberRemoved
} from './actions'
import { updateTrack, startListening } from '../track/actions'
import RoomClient from '../../room/client'
import { PlaybackInfo } from '../../spotify/types'

const createRoomLogic = createLogic({
  type: CREATE_ROOM,
  async process({ getState, action }: ProcessOpts, dispatch, done) {
    const username = 'alice'
    const room = await RoomClient.create(username)
    console.log('room: ', room)
    dispatch(joinedRoom(room))
    dispatch(startListening())
    done()
  }
})

const connectToRoomLogic = createLogic({
  type: CONNECT_TO_ROOM,
  async process({ getState, action }: ProcessOpts, dispatch, done) {
    const { roomname } = action.payload
    const username = 'bob'
    const room = await RoomClient.connect(roomname, username)
    dispatch(joinedRoom(room))
    done()
  }
})

const joinedRoomLogic = createLogic({
  type: JOINED_ROOM,
  warnTimeout: 0,
  async process({ getState, action }: ProcessOpts, dispatch, done) {
    console.log('joined room')
    const { room } = action.payload
    room.onTrackUpdate = (data: PlaybackInfo) => {
      console.log('data: ', data)
      const roomState = getState().room
      if(roomState.userId !== roomState.leader){
        dispatch(updateTrack(data))
      }
    }
    room.onMemberAdded = (name: string) => dispatch(memberAdded(name))
    room.onMemberRemoved = (name: string) => dispatch(memberRemoved(name))
  }
})

export default [
  createRoomLogic,
  connectToRoomLogic,
  joinedRoomLogic,
]
