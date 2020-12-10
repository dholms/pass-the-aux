import React from 'react'
import { connect } from 'react-redux'
import { withStyles, createStyles, Theme } from "@material-ui/core/styles"

import { GlobalState } from '../redux/store'
import { passAux } from '../redux/room/actions'

import MemberListItem from './MemberListItem'

import Typography from '@material-ui/core/Typography'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import List from '@material-ui/core/List'
import Divider from '@material-ui/core/Divider'
import Tooltip from "@material-ui/core/Tooltip"
import IconButton from "@material-ui/core/IconButton"
import LinkIcon from "@material-ui/icons/Link"
import { Member } from '../room/types'

class MemberList extends React.Component<Props> {
  copyLink(link: string) {
    navigator.clipboard.writeText(link)
  }

  render() {
    const { roomname, members, leader, userId, classes } = this.props
    const link = `${window.location.origin}/${roomname || ''}`.replace('www.', '')
    return (
      <div>
        <Card className={classes.card}>
          <CardContent>
            <Typography variant='h5'>
              Invite Friends!<br/>
              <Typography className={classes.link}>
                {link}
                <Tooltip title='Copy Link'>
                  <IconButton onClick={() => this.copyLink(link)}>
                    <LinkIcon />
                  </IconButton>
                </Tooltip>
              </Typography>
            </Typography>
            <Divider className={classes.divider} />
            <Typography>
              <strong>Members</strong>
            </Typography>
            <List>
              {members.map(member => 
                <MemberListItem 
                  key={member.id}
                  member={member}
                  leader={leader}
                  userId={userId}
                  passAux={this.props.passAux}
                />
              )}
            </List>
          </CardContent>
        </Card>
      </div>
    )
  }
}

interface Props {
  roomname: string | null
  members: Member[]
  leader: string | null
  userId: string | null
  passAux: typeof passAux
  classes: any
}

const mapStateToProps = (state: GlobalState) => ({
  roomname: state.room.name,
  members: state.room.members,
  leader: state.room.leader,
  userId: state.room.userId,
})

const mapDispatchToProps = {
  passAux
}

const styles = (theme: Theme) =>
  createStyles({
    card: {
      width: 350,
      opacity: 1
    },
    divider: {
      marginBottom: 8
    },
    link: {
      fontSize: 18
    }
  })

export default connect(mapStateToProps, mapDispatchToProps)(
  withStyles(styles)(MemberList)
)
