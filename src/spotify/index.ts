import axios from 'axios'
import querystring from 'querystring'
import { Device, SpotifyPlayer } from './types'

export const POLL_INTERVAL = 3000
export const DEBOUNCE_RANGE = 3000

const SPOTIFY_BASE_URL = 'https://api.spotify.com/v1/me'
const SPOTIFY_AUTH_URL = 'https://accounts.spotify.com/authorize?'
const SPOTIFY_CLIENT_ID = '94c3aab0549f494c80c8585d19b6af2f'
const SPOTIFY_REDIRECT_URI =
  process.env.NODE_ENV === 'production'
  ? 'https://www.passtheaux.live/callback'
  : 'http://localhost:3000/callback'

export const loginRedirect = () => {
  const url = SPOTIFY_AUTH_URL + querystring.stringify({
    response_type: 'token',
    client_id: SPOTIFY_CLIENT_ID,
    scope: 'user-read-playback-state user-modify-playback-state streaming user-read-email user-read-private',
    redirect_uri: SPOTIFY_REDIRECT_URI,
  })
  window.location.replace(url)
}

const makeHeader = (token: string) => {
  return { 'Authorization': 'Bearer ' + token }
}

export const createPlayer = async (token: string): Promise<SpotifyPlayer> => {
  // ensure spotify loaded
  for(let i=0; i<10; i++){
    if((window as any).Spotify !== undefined){
      break
    }
    await wait(50)
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

  // Connect to the player!
  player.connect();

  // Choose player as device
  await setDeviceToPlayer(token)

  return player
}

export const changeTrack = async (token: string, uri: string, position = 0) => {
  await axios.put(`${SPOTIFY_BASE_URL}/player/play`, {
    uris: [uri],
    position_ms: position
  }, {
    headers: makeHeader(token)
  })
}

export const setDeviceToPlayer = async(token: string, tries = 5): Promise<void> => {
  const deviceId = await getPlayerId(token, tries)
  if(deviceId === null) {
    throw new Error("Could not find Pass the Aux device")
  }
  // spotify gets nervous & needs a second to breath
  await wait(100)
  await axios.put(`${SPOTIFY_BASE_URL}/player`, { device_ids: [deviceId] }, {
    headers: makeHeader(token)
  })
}

export const getPlayerId = async (token: string, tries = 5): Promise<string | null> => {
  let player: Device | undefined
  for(let i=0; i<tries; i++){
    const devices = await getDevices(token)
    player = devices.find(d => d.name === 'Pass the Aux')
    if(player !== undefined) {
      break
    }
    await wait(500) 
  }
  return player === undefined ? null : player.id
}

export const getDevices = async (token: string): Promise<Device[]> => {
  const res = await axios.get(`${SPOTIFY_BASE_URL}/player/devices`, {
    headers: makeHeader(token)
  })
  return res?.data?.devices || []
}

export const pauseTrack = async (token: string) => {
  await axios.put(`${SPOTIFY_BASE_URL}/player/pause`, { }, {
    headers: makeHeader(token)
  })
}

export const getUserInfo = async (token: string) => {
  const resp = await axios.get(`${SPOTIFY_BASE_URL}`, {
    headers: makeHeader(token)
  })
  const { display_name = 'Noname', images = [] } = resp?.data || {}
  const image = images.length > 0 ? images[0].url : null

  return {
    name: display_name,
    token,
    image,
  }
}

const wait = (time: number) => {
  return new Promise(resolve => {
    setTimeout(resolve, time)
  })
}

export default {
  loginRedirect,
  createPlayer,
  changeTrack,
  setDeviceToPlayer,
  getPlayerId,
  getDevices,
  pauseTrack,
  getUserInfo,
}
