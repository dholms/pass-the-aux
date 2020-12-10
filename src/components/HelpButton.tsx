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
                Make sure the "Pass the Aux" is selected as the device in your spotify player.
              </Question>
              <Question question='Do I need a paid Spotify account?'>
                Yup unfortunately, Spotify's API is very limited for free accounts
              </Question>
              <Question question='Can you add playlists/track status/voting/etc?'>
                Nope. This is a digital aux cord. Does the aux cord in your car of those features?
              </Question>
              <Question question='Are you mining my data and sending it to Zuckerberg for easy cash?'>
                Nope. Everything is client side, and the code is open source so you can check it for anything spooky 👻
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
