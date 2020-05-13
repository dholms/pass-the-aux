import { Action } from 'redux'
import { PlaybackInfo } from '../../spotify/types'

export const START_LISTENING = 'START_LISTENING'
export const TRACK_STATUS = 'TRACK_STATUS'
export const UPDATE_TRACK = 'UPDATE_TRACK'

export interface StartListeningAction extends Action {
  type: 'START_LISTENING'
}

export const startListening = (): StartListeningAction => ({
  type: START_LISTENING,
})

export interface TrackStatusAction extends Action {
  type: 'TRACK_STATUS'
  payload: PlaybackInfo
}

export const trackStatus = (payload: PlaybackInfo): TrackStatusAction => ({
  type: TRACK_STATUS,
  payload
})

export interface UpdateTrackAction extends Action {
  type: 'UPDATE_TRACK'
  payload: PlaybackInfo
}

export const updateTrack = (payload: PlaybackInfo): UpdateTrackAction => ({
  type: UPDATE_TRACK,
  payload
})

export type TrackAction
  = StartListeningAction
  | TrackStatusAction
  | UpdateTrackAction
