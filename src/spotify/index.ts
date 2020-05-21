import axios from 'axios'
import querystring from 'querystring'
import { Track, PlaybackInfo } from './types'

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
    scope: 'user-read-playback-state user-modify-playback-state',
    redirect_uri: SPOTIFY_REDIRECT_URI,
  })
  window.location.replace(url)
}

const stringifyArtists = (artists: {name: string}[]) => {
  return artists.map(a => a.name).join(',')
}

const makeHeader = (token: string) => {
  return { 'Authorization': 'Bearer ' + token }
}

export const getCurr = async (token: string): Promise<PlaybackInfo | null> => {
  const resp = await axios.get(`${SPOTIFY_BASE_URL}/player/currently-playing`, {
    headers: makeHeader(token)
  })
  const { item, is_playing, progress_ms } = resp?.data || {}
  if(!item){
    return null
  }
  const { uri, name, artists, album } = item
  return {
    paused: !is_playing,
    progress: progress_ms,
    track: {
      uri,
      name,
      artist: stringifyArtists(artists),
      album: album.name,
      img: album.images[0].url
    }
  }
}

export const changeTrack = async (token: string, uri: string, position = 0) => {
  await axios.put(`${SPOTIFY_BASE_URL}/player/play`, {
    uris: [uri],
    position_ms: position
  }, {
    headers: makeHeader(token)
  })
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

export class SpotifyListener {

  token: string
  curr: Track | null
  running: boolean

  constructor(token: string){
    this.token = token
    this.curr = null
    this.running = false
  }

  async *start(): AsyncIterable<PlaybackInfo | null> {
    this.running = true

    while(this.running) {
      const curr = await getCurr(this.token)
      yield curr
      await wait(POLL_INTERVAL)
    }
  }

  stop() {
    this.running = false
  }
}

const wait = (time: number) => {
  return new Promise(resolve => {
    setTimeout(resolve, time)
  })
}

export default {
  loginRedirect,
  getCurr,
  changeTrack,
  pauseTrack,
  getUserInfo,
}
