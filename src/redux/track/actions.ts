import { Action } from 'redux'
import { PlaybackInfo } from '../../spotify/types'
import { SpotifyListener } from '../../spotify'

export const START_LISTENING = 'START_LISTENING'
export const STARTED_LISTENING = 'STARTED_LISTENING'

export const STOP_LISTENING = 'STOP_LISTENING'
export const STOPPED_LISTENING = 'STOPPED_LISTENING'

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
    listener: SpotifyListener
  }
}

export const startedListening = (listener: SpotifyListener): StartedListeningAction => ({
  type: STARTED_LISTENING,
  payload: {
    listener
  }
})

export interface StopListeningAction extends Action {
  type: 'STOP_LISTENING'
}

export const stopListening = (): StopListeningAction => ({
  type: STOP_LISTENING,
})

export interface StoppedListeningAction extends Action {
  type: 'STOPPED_LISTENING'
}

export const stoppedListening = (): StoppedListeningAction => ({
  type: STOPPED_LISTENING,
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
  | StartedListeningAction
  | StopListeningAction
  | StoppedListeningAction
  | TrackStatusAction
  | UpdateTrackAction
