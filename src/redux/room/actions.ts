import { Action } from 'redux'
import RoomClient from '../../room/client'
import { Member } from '../../room/types'
import { PlayerState, SpotifyPlayer } from '../../spotify/types'

export const MEMBER_ADDED = 'MEMBER_ADDED'
export const MEMBER_REMOVED = 'MEMBER_REMOVED'

export const CREATE_ROOM = 'CREATE_ROOM'
export const CONNECT_TO_ROOM = 'CONNECT_TO_ROOM'
export const JOINED_ROOM = 'JOINED_ROOM'

export const PASS_AUX = 'PASS_AUX'
export const AUX_PASSED = 'AUX_PASSED'

export const UPDATE_TRACK = 'UPDATE_TRACK'
export const TRACK_STATUS = 'TRACK_STATUS'

export const SYNC_PLAYER = 'SYNC_PLAYER'
export const CREATED_PLAYER = 'CREATED_PLAYER'

interface MemberAddedAction {
  type: 'MEMBER_ADDED'
  payload: {
    member: Member
  }
}

export const memberAdded = (member: Member): MemberAddedAction => ({
  type: MEMBER_ADDED,
  payload: {
    member
  }
})

interface MemberRemovedAction {
  type: 'MEMBER_REMOVED'
  payload: {
    id: string
  }
}

export const memberRemoved = (id: string): MemberRemovedAction => ({
  type: MEMBER_REMOVED,
  payload: {
    id
  }
})

interface CreateRoomAction {
  type: 'CREATE_ROOM'
  payload: { }
}

export const createRoom = (): CreateRoomAction => ({
  type: CREATE_ROOM,
  payload: { }
})

interface ConnectToRoomAction {
  type: 'CONNECT_TO_ROOM'
  payload: {
    roomname: string
  }
}

export const connectToRoom = (roomname: string): ConnectToRoomAction => ({
  type: CONNECT_TO_ROOM,
  payload: {
    roomname
  }
})

interface JoinedRoomAction {
  type: 'JOINED_ROOM'
  payload: { 
    room: RoomClient,
  }
}

export const joinedRoom = (room: RoomClient): JoinedRoomAction => ({
  type: JOINED_ROOM,
  payload: {
    room,
  }
})

interface PassAuxAction {
  type: 'PASS_AUX'
  payload: {
    id: string
  }
}

export const passAux = (id: string): PassAuxAction => ({
  type: PASS_AUX,
  payload: {
    id
  }
})

interface AuxPassedAction {
  type: 'AUX_PASSED'
  payload: {
    id: string
  }
}

export const auxPassed = (id: string): AuxPassedAction => ({
  type: AUX_PASSED,
  payload: {
    id
  }
})

export interface UpdateTrackAction extends Action {
  type: 'UPDATE_TRACK'
  payload: PlayerState
}

export const updateTrack = (payload: PlayerState): UpdateTrackAction => ({
  type: UPDATE_TRACK,
  payload
})

export interface TrackStatusAction extends Action {
  type: 'TRACK_STATUS'
  payload: PlayerState
}

export const trackStatus = (payload: PlayerState): TrackStatusAction => ({
  type: TRACK_STATUS,
  payload
})

export interface SyncPlayerAction extends Action {
  type: 'SYNC_PLAYER'
  payload: {}
}

export const syncPlayer = (): SyncPlayerAction => ({
  type: SYNC_PLAYER,
  payload: {}
})

export interface CreatedPlayerAction extends Action {
  type: 'CREATED_PLAYER'
  payload: {
    player: SpotifyPlayer
  }
}

export const createdPlayer = (player: SpotifyPlayer): CreatedPlayerAction => ({
  type: CREATED_PLAYER,
  payload: {
    player
  }
})



export type RoomAction 
  = MemberAddedAction
  | MemberRemovedAction
  | CreateRoomAction
  | ConnectToRoomAction
  | JoinedRoomAction
  | PassAuxAction
  | AuxPassedAction
  | UpdateTrackAction
  | TrackStatusAction
  | SyncPlayerAction
  | CreatedPlayerAction
