import React from 'react'
import { withStyles, createStyles, Theme } from "@material-ui/core/styles"

import ListItem from '@material-ui/core/ListItem'
import ListItemAvatar from '@material-ui/core/ListItemAvatar'
import ListItemText from '@material-ui/core/ListItemText'
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction'

import Avatar from '@material-ui/core/Avatar'
import Tooltip from '@material-ui/core/Tooltip'
import IconButton from '@material-ui/core/IconButton'
import Icon from '@material-ui/core/Icon'

import greyAuxIcon from '../assets/greyAuxIcon.svg'
import greenAuxIcon from '../assets/greenAuxIcon.svg'
import { Member } from '../room/types'

interface AuxButtonProps {
  isLeader: boolean
  onClick: () => void
}

const AuxButton = ({ onClick, isLeader }: AuxButtonProps) => (
  <Tooltip title="Pass Aux">
    <IconButton onClick={onClick} disabled={isLeader}>
      <Icon>
        <img 
          src={isLeader ? greenAuxIcon : greyAuxIcon}
          width={24}
          alt="Pass Aux"
        />
      </Icon>
    </IconButton>
  </Tooltip>
)


const MemberListItem = (props: Props) => {
  const { member, leader, userId, classes } = props
  const { name, image, id } = member

  const displayButton = leader === userId || id === leader

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
            <AuxButton isLeader={id === leader} onClick={() => props.passAux(id)} />
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
