import React from 'react'
import { connect } from 'react-redux'
import { userLoggedIn } from './redux/user/actions'
import { GlobalState } from './redux/store'

import querystring from 'querystring'

import spotify from './spotify'

class Login extends React.Component<Props> {

  componentWillMount() {
    // remove later
    if(!this.props.loggedIn){
      const token = 'BQAH15ooPQGWBgOaMc-0PXYEQTsdp5dPGCe6Qk7HKvM3TDxHQeWCqHnz8qLwkwCPMqBPVrtNCRccyTfX7mgf-oxD7LSCEq9F8P00pKyoR5ADPbECvO2kLDkKsbW6HElX6yW4EUgixbLgd8LBZCdQZTcBKcQ91VVaBzYFRebWRH8'
      this.props.userLoggedIn(token)
    }

    if(window.location.pathname.indexOf('callback') > -1){
      const qs = querystring.parse(window.location.hash.slice(1))
      if(qs.access_token && typeof qs.access_token === 'string') {
        this.props.userLoggedIn(qs.access_token)
      }
    }
  }

  promptLogin() {
    spotify.loginRedirect()
  }

  render() {
    if(this.props.loggedIn){
      return null
    }
    return (
      <button onClick={this.promptLogin}>Login with Spotify</button>
    )
  }
}

interface Props {
  loggedIn: boolean
  userLoggedIn: typeof userLoggedIn
}

const mapStateToProps = (state: GlobalState) => ({
  loggedIn: state.user.token !== null,
})

const mapDispatchToProps = {
  userLoggedIn
}

export default connect(mapStateToProps, mapDispatchToProps)(Login)
