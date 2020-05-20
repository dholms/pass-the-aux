import React from 'react'
import { connect } from 'react-redux'
import { withStyles, createStyles, Theme } from "@material-ui/core/styles"

import { GlobalState } from '../redux/store'

import MemberListItem from './MemberListItem'

import Typography from '@material-ui/core/Typography'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import List from '@material-ui/core/List'
import Divider from '@material-ui/core/Divider'
import { Member } from '../room/types'

class MemberList extends React.Component<Props> {

  render() {
    const { roomname, members, classes } = this.props
    return (
      <div>
        <Card className={classes.card}>
          <CardContent>
            <Typography variant='h5'>
              Room: {roomname}
            </Typography>
            <Divider className={classes.divider} />
            <Typography>
              <strong>Members</strong>
            </Typography>
            <List>
              {members.map(member => <MemberListItem member={member} />)}
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
  classes: any
}

const mapStateToProps = (state: GlobalState) => ({
  roomname: state.room.name,
  members: state.room.members,
})

const mapDispatchToProps = { }

const styles = (theme: Theme) =>
  createStyles({
    card: {
      width: 350
    },
    divider: {
      marginBottom: 8
    },
  })

export default connect(mapStateToProps, mapDispatchToProps)(
  withStyles(styles)(MemberList)
)
