export type Track = {
  uri: string
  name: string
  artist: string
  album: string
  img: string
}

export type PlaybackInfo = {
  paused: boolean
  progress: number
  track: Track
}
