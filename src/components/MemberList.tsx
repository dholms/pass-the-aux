import React from 'react'
import { connect } from 'react-redux'
import { GlobalState } from '../redux/store'

class MemberList extends React.Component<Props> {

  render() {
    const { members } = this.props
    return (
      <div>
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
}

const mapStateToProps = (state: GlobalState) => ({
  members: state.room.members,
})

const mapDispatchToProps = { }

export default connect(mapStateToProps, mapDispatchToProps)(MemberList)
