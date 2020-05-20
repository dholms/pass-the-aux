import React from 'react'
import { connect } from 'react-redux'
import { withStyles, createStyles, Theme } from "@material-ui/core/styles";

import { gotUserToken } from '../redux/user/actions'
import { GlobalState } from '../redux/store'

import querystring from 'querystring'
import spotify from '../spotify'

import Button from '@material-ui/core/Button'

class LoginButton extends React.Component<Props> {

  componentDidMount() {
    // Parse spotify query string that includes token.
    if(window.location.pathname.indexOf('callback') > -1){
      const qs = querystring.parse(window.location.hash.slice(1))
      if(qs.access_token && typeof qs.access_token === 'string') {
        this.props.gotUserToken(qs.access_token)
      }
    }
  }

  promptLogin() {
    spotify.loginRedirect()
  }

  render() {
    const { classes } = this.props
    if(this.props.loggedIn) return null
    return (
      <Button 
        onClick={this.promptLogin}
        className={classes.spotifyButton}
        color='secondary'
        variant='contained'
      >
        Login with Spotify
      </Button>
    )
  }
}

interface Props {
  loggedIn: boolean
  gotUserToken: typeof gotUserToken
  classes: any
}

const mapStateToProps = (state: GlobalState) => ({
  loggedIn: state.user.token !== null,
})

const mapDispatchToProps = {
  gotUserToken
}


const styles = (theme: Theme) =>
  createStyles({
    spotifyButton: {
      color: '#FFF',
      borderRadius: 32,
      fontSize: 18,
      padding: '16px 32px'
    }
  });

export default connect(mapStateToProps, mapDispatchToProps)(
  withStyles(styles)(LoginButton)
)
