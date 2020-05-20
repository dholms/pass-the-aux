import React, { ReactElement } from 'react'
import { withStyles, createStyles, Theme } from "@material-ui/core/styles";

import Modal from '@material-ui/core/Modal'
import Typography from '@material-ui/core/Typography'
import IconButton from '@material-ui/core/IconButton'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import Divider from '@material-ui/core/Divider'

import HelpIcon from '@material-ui/icons/Help'

class HelpButton extends React.Component<Props, State> {

  state={
    open: false
  }

  handleOpen = () => {
    this.setState({ open: true })

  }

  handleClose = () => {
    this.setState({ open: false })
  }

  render() {
    const { classes } = this.props
    return (
      <React.Fragment>
        <IconButton className={classes.main} onClick={this.handleOpen}>
          <HelpIcon fontSize='large'/>
        </IconButton>
        <Modal
          open={this.state.open}
          onClose={this.handleClose}
          style={{ 
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Card className={classes.card}>
            <CardContent>
              <Typography variant='h4'>
                Help
              </Typography>
              <Divider className={classes.divider} />
              <Question question="I joined a room but music won't play.">
                Make sure you have your Spotify app open. Try playing a random song. We need to know which device you're using so that it can start playing there.
              </Question>
              <Question question='Do I need a paid Spotify account?'>
                To play music? No. To listen to music? Yes. I know this is sort of weird. The reason is that free-tier Spotify doesn't let you play specific tracks, only shuffle playlists/albums. This app works by telling spotify to play certain tracks.
              </Question>
              <Question question='Why does it make me refresh my login every hour?'>
                <strong>Short answer:</strong> because Spotify makes us.<br/>

                <strong>Long (techy) answer:</strong> because everything happens client-side, we're not storing user tokens. Spotify's client-side auth is ephemeral and expires every hour.
              </Question>
              <Question question='Can you add playlists/track status/voting/etc?'>
                Nope. This is a digital aux cord. Does the aux cord in your car of those features?
              </Question>

            </CardContent>
          </Card>
        </Modal>

      </React.Fragment>
    )
  }
}

const Question = (props: { question: string, children:  ReactElement | string | (ReactElement | string)[]}): ReactElement => (
  <React.Fragment>
    <Typography variant='h6'>
      {props.question}
    </Typography>
    <Typography>
      {props.children}
    </Typography>
    <br/>
  </React.Fragment>
)

interface Props {
  classes: any
}

interface State {
  open: boolean
}

const styles = (theme: Theme) =>
  createStyles({ 
    main:{
      // pass-through styles
    },
    card: {
      maxWidth: 800,
    },
    divider: {
      marginTop: 8,
      marginBottom: 16
    }
  });

export default withStyles(styles)(HelpButton)
