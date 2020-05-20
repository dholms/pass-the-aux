import React from 'react'
import { withStyles, createStyles, Theme } from "@material-ui/core/styles"

import ListItem from '@material-ui/core/ListItem'
import ListItemAvatar from '@material-ui/core/ListItemAvatar'
import ListItemText from '@material-ui/core/ListItemText'
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction'

import Avatar from '@material-ui/core/Avatar'
import Tooltip from '@material-ui/core/Tooltip'
import IconButton from '@material-ui/core/IconButton'
import StarIcon from '@material-ui/icons/Star'

import { Member } from '../room/types'


const MemberListItem = (props: Props) => {
  const { member, leader, userId, classes } = props
  const { name, image, id } = member
  console.log('id: ', id)

  const userIsLeader = leader === userId
  const displayButton = (userIsLeader && id !== userId) || (!userIsLeader && id === leader)

  return (
    <ListItem className={classes.main}>
      <ListItemAvatar className={classes.avatar}>
        { image
          ? <Avatar alt={name} src={image}/>
          : <Avatar>{name.slice(0, 1)}</Avatar>
        }
      </ListItemAvatar>
      <ListItemText primary={name} />
      { displayButton && 
        <ListItemSecondaryAction>
          <Tooltip title="Pass Aux">
            <IconButton disabled={!userIsLeader} onClick={() => props.passAux(id)}>
              <StarIcon />
            </IconButton>
          </Tooltip>
        </ListItemSecondaryAction>
      }
    </ListItem>
  )
}

interface Props {
  member: Member
  leader: string | null
  userId: string | null
  passAux: (id: string) => void
  classes: any
}

const styles = (theme: Theme) =>
  createStyles({ })

export default withStyles(styles)(MemberListItem)
