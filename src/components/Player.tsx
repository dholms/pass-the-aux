import React from 'react'
import SpotifyPlayer from 'react-spotify-web-playback'

class Player extends React.Component<Props, State> {

  // state = {
  //   loaded: false
  // }

  // componentDidMount() {
  //   this.checkLoaded()
  // }

  // checkLoaded = () => {
  //   const loaded = (window as any).Spotify !== undefined
  //   if(loaded) {
  //     console.log("LOADED")
  //     this.setState({ loaded })
  //     this.initializePlayer()
  //   } else {
  //     setTimeout(this.checkLoaded, 500)
  //   }
  // }

  // initializePlayer() {
  //   const token = 'BQDr8n5wMzxgwf-8r3iEoyL8fEG7mR7-lATxkbfRNvgB9nNQeArchiYH-VzPZC7zu_Zv--z_69AF9BMLNA9BZGGYyoWmerx3fKIQIQUa3R_SgF0myTmrL-U37ufgM8281tBbV5aiMwHt9h-qQZWjXRYtL-qIn-DCp3VXcniAvQViGlL5i90'
  //   const player = new (window as any).Spotify.Player({
  //     name: 'player',
  //     getOAuthToken: (cb: (token: string) => void) => { cb(token) }
  //   })
  //   console.log('player:', player)
  // }

  render() {
    // const uri = 'spotify:track:1JweeRbJ87ViccTOW7cwz9'
    const uri = 'spotify:artist:6HQYnRM4OzToCYPpVBInuU'
    // const token = 'BQBCQ1N-F1YzV3w0gt3pCZz__Ytv_HAjACFUfLlgdI4n2aX1TZLBngouhMViVczuEQdC6-VhVurTbGYsC1l78fHvajf3H9TeQOLEw2BB2BQtCHOXIxsScKn0lGklv1SJZQmUZej-cc3K4sE5KH8LxtqhOMqVUIOCgRvv1jiUUF801BT07sRac1qiOvrG5BDDPebmQwQ84tznXrQ'
    const token = 'BQAsozGFa50ZanrD9pc-4LFaWrHem_l_hLO7D9UxiaBoLRPNZog-BQ7cBR2qhsw48b8UG76xYZE88-0CqbryPyuWjW1FPGCeUFDLYqLBh5ThcmzrmokWJdjQWaEuGv8p4ze23YkClxe_ozTVu91axqvZzDIz0IeObDpefUcRR_izkn-tWvg'
    return <SpotifyPlayer 
      token = {token}
      uris={uri}
      autoPlay
    />

  }

}

interface Props {

}

interface State {
  loaded: boolean
}

export default Player
