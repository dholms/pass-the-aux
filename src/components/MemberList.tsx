import React from 'react'
import { connect } from 'react-redux'
import { userLoggedIn } from '../redux/user/actions'
import { GlobalState } from '../redux/store'
import { createRoom, connectToRoom } from '../redux/room/actions'

class MemberList extends React.Component<Props> {

  create = () => {
    this.props.createRoom('room', 'alice')
  }

  connect = () => {
    this.props.connectToRoom('room', 'bob')
  }

  render() {
    const { members } = this.props
    return (
      <div>
        <button onClick={this.create}>Create</button>
        <button onClick={this.connect}>Connect</button>
        <ul>
          {members.map(name => (
            <li key={name}>{name}</li>
          ))}
        </ul>
      </div>
    )
  }
}

interface Props {
  members: string[]
  createRoom: typeof createRoom
  connectToRoom: typeof connectToRoom
}

const mapStateToProps = (state: GlobalState) => ({
  members: state.room.members
})

const mapDispatchToProps = {
  userLoggedIn,
  createRoom,
  connectToRoom
}

export default connect(mapStateToProps, mapDispatchToProps)(MemberList)
