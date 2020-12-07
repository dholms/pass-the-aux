import { Action } from 'redux'
import { PlayerState, SpotifyPlayer } from '../../spotify/types'

export const START_LISTENING = 'START_LISTENING'
export const STARTED_LISTENING = 'STARTED_LISTENING'

export const TRACK_STATUS = 'TRACK_STATUS'
export const UPDATE_TRACK = 'UPDATE_TRACK'

export interface StartListeningAction extends Action {
  type: 'START_LISTENING'
}

export const startListening = (): StartListeningAction => ({
  type: START_LISTENING,
})

export interface StartedListeningAction extends Action {
  type: 'STARTED_LISTENING'
  payload: {
    player: SpotifyPlayer
  }
}

export const startedListening = (player: SpotifyPlayer): StartedListeningAction => ({
  type: STARTED_LISTENING,
  payload: {
    player
  }
})

export interface TrackStatusAction extends Action {
  type: 'TRACK_STATUS'
  payload: PlayerState
}

export const trackStatus = (payload: PlayerState): TrackStatusAction => ({
  type: TRACK_STATUS,
  payload
})

export interface UpdateTrackAction extends Action {
  type: 'UPDATE_TRACK'
  payload: PlayerState
}

export const updateTrack = (payload: PlayerState): UpdateTrackAction => ({
  type: UPDATE_TRACK,
  payload
})

export type TrackAction
  = StartListeningAction
  | StartedListeningAction
  | TrackStatusAction
  | UpdateTrackAction
