import React from 'react'
import { withStyles, createStyles, Theme } from "@material-ui/core/styles"

import ListItem from '@material-ui/core/ListItem'
import ListItemAvatar from '@material-ui/core/ListItemAvatar'
import ListItemText from '@material-ui/core/ListItemText'
import Avatar from '@material-ui/core/Avatar'
import { Member } from '../room/types'

const MemberListItem = (props: Props) => {
  const { member, classes } = props
  const { name, image, id } = member
  return (
    <ListItem className={classes.main}>
      <ListItemAvatar className={classes.avatar}>
        { image
          ? <Avatar alt={name} src={image}/>
          : <Avatar>{name.slice(1)}</Avatar>
        }
      </ListItemAvatar>
      <ListItemText key={id} primary={name} />
    </ListItem>
  )
}

interface Props {
  member: Member
  classes: any
}

const styles = (theme: Theme) =>
  createStyles({
    main: {
      justifyContent: 'flex-start'
    },
    avatar: {
      margin: 0

    }
  })

export default withStyles(styles)(MemberListItem)
