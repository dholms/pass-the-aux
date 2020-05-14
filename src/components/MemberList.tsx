import React from 'react'
import { connect } from 'react-redux'
import { withStyles, createStyles, Theme } from "@material-ui/core/styles";

import { GlobalState } from '../redux/store'

import Typography from '@material-ui/core/Typography'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import Divider from '@material-ui/core/Divider'

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
              {members.map(name => (
                <ListItem className={classes.listItem}>
                  <ListItemText key={name} primary={name} />
                </ListItem>
              ))}
            </List>
          </CardContent>
        </Card>
      </div>
    )
  }
}

interface Props {
  roomname: string | null
  members: string[]
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
    listItem: {
      padding: 0
    }
  })

export default connect(mapStateToProps, mapDispatchToProps)(
  withStyles(styles)(MemberList)
)
