import axios from 'axios'
import querystring from 'querystring'
import { Track, PlaybackInfo } from './types'
import { TrackAction, trackUpdate } from '../redux/track/actions'

const BASE_URL = 'https://api.spotify.com/v1/me'
const AUTH_URL = 'https://accounts.spotify.com/authorize?'
const CLIENT_ID = "94c3aab0549f494c80c8585d19b6af2f"
const REDIRECT_URI = "http://localhost:3000/callback"

export const loginRedirect = () => {
  const url = AUTH_URL + querystring.stringify({
    response_type: 'token',
    client_id: CLIENT_ID,
    // scope: ['user-read-playback-state', 'user-modify-playback-state'],
    scope: 'user-read-playback-state user-modify-playback-state',
    redirect_uri: REDIRECT_URI,
  })
  window.location.replace(url)
}

const stringifyArtists = (artists: {name: string}[]) => {
  return artists.map(a => a.name).join(',')
}

const makeHeader = (token: string) => {
  return { 'Authorization': 'Bearer ' + token }
}

export const getCurr = async (token: string): Promise<PlaybackInfo> => {
  const resp = await axios.get(`${BASE_URL}/player/currently-playing`, {
    headers: makeHeader(token)
  })
  const data = resp.data
  const { uri, name, artists, album } = data.item
  console.log(uri)
  return {
    paused: !data.is_playing,
    progress: data.progress_ms,
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
  await axios.put(`${BASE_URL}/player/play`, {
    uris: [uri],
    position
  }, {
    headers: makeHeader(token)
  })
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

  async *start(): AsyncIterable<TrackAction> {
    this.running = true

    while(this.running) {
      const curr = await getCurr(this.token)
      yield trackUpdate(curr)
      await wait(5000)
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
}
