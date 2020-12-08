import { createLogic } from 'redux-logic'
import { 
  START_LISTENING, UPDATE_TRACK,
  trackStatus,
  startedListening
} from './actions'
import spotify, { DEBOUNCE_RANGE } from '../../spotify'
import { ProcessOpts } from '../types'
import { PlayerState, SpotifyPlayer } from '../../spotify/types'

const startListeningLogic = createLogic({
  type: START_LISTENING,
  warnTimeout: 0,
  async process({ getState, action }: ProcessOpts, dispatch, done) {
    const state = getState()
    const token = state.user.token
    if(!token){
      throw new Error("User not logged in")
    }

    const player: SpotifyPlayer = new (window as any).Spotify.Player({
      name: 'Pass the Aux',
      getOAuthToken: (cb: any) => { cb(token); }
    });

    // Error handling
    player.addListener('initialization_error', ({ message }: any) => { console.error(message); });
    player.addListener('authentication_error', ({ message }: any) => { console.error(message); });
    player.addListener('account_error', ({ message }: any) => { console.error(message); });
    player.addListener('playback_error', ({ message }: any) => { console.error(message); });

    // send updates
    player.addListener('player_state_changed', (playerState: PlayerState) => {
      const room = getState().room.room
      if(room === null){
        // TODO: Better error handling here
        throw new Error("Not connect to room")
      }
      if(room.leader === state.room.userId) {
        room.updateTrack(playerState)
      }
      dispatch(trackStatus(playerState))
    });

    // Connect to the player!
    player.connect();
    dispatch(startedListening(player))

    // Choose player as device
    spotify.setDeviceToPlayer(token)

  }
})

const updateTrackLogic = createLogic({
  type: UPDATE_TRACK,
  warnTimeout: 0,
  async process({ getState, action }: ProcessOpts, dispatch, done) {
    const token = getState().user.token
    const info: PlayerState = action.payload
    if(!token){
      throw new Error("User not logged in")
    }

    const { player } = getState().track
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
  }
})

export default [
  startListeningLogic,
  updateTrackLogic,
]
