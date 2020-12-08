// export type Track = {
//   uri: string
//   name: string
//   artist: string
//   album: string
//   img: string
// }

// export type PlaybackInfo = {
//   paused: boolean
//   progress: number
//   track: Track
// }

export interface SpotifyPlayer {
  addListener: (msg: string, callback: any) => any
  getCurrentState: () => Promise<PlayerState | null>
  connect: () => Promise<boolean>
  pause: () => Promise<boolean>
  resume: () => Promise<boolean>
}

export type PlayerState = {
  bitrate: number
  context: Object
  disallows: Object
  duration: number
  paused: boolean
  position: number
  repeat_mode: number
  restrictions: Object
  shuffle: boolean
  timestamp: number
  track_window: TrackWindow
}

export type TrackWindow = {
  current_track: Track
  next_tracks: Track[]
  previous_tracks: Track[]
}

export type Track = {
  album: Album
  artists: Artist[]
  duration_ms: number
  id: string
  name: string
  uri: string
}

export type Album = {
  url: string
  name: string
  images: AlbumArt[]
}

export type AlbumArt = {
  url: string
  height: number
  width: number
}

export type Artist = {
  name: string
  uri: string
}

export type Device = {
  id: string
  is_active: boolean
  is_private_session: boolean
  is_restricted: boolean
  name: string
  type: string
  volume_percent: number
}
