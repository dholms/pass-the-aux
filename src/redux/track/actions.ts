import { Action } from 'redux'
import { Track, PlaybackInfo } from '../../spotify/types'

export const START_LISTENING = 'START_LISTENING'
export const TRACK_UPDATE = 'TRACK_UPDATE'
export const TRACK_CHANGED = 'TRACK_CHANGED'

export interface StartListeningAction extends Action {
  type: 'START_LISTENING'
}

export const startListening = (): StartListeningAction => ({
  type: START_LISTENING,
})


export interface TrackUpdateAction extends Action {
  type: 'TRACK_UPDATE'
  payload: PlaybackInfo
}

export const trackUpdate = (payload: PlaybackInfo): TrackUpdateAction => ({
  type: TRACK_UPDATE,
  payload
})


export interface TrackChangedAction extends Action {
  type: 'TRACK_CHANGED'
  payload: {
    track: Track
  }
}

export const trackChanged = (track: Track): TrackChangedAction => ({
  type: TRACK_CHANGED,
  payload:  {
    track
  }
})

export type TrackAction
  = StartListeningAction
  | TrackUpdateAction
  | TrackChangedAction
