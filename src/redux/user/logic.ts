import { createLogic } from 'redux-logic'
import { GOT_USER_TOKEN, userLoggedIn } from './actions'
import spotify from '../../spotify'
import { ProcessOpts } from '../types'

const gotUserTokenLogic = createLogic({
  type: GOT_USER_TOKEN,
  async process({ getState, action }: ProcessOpts, dispatch, done) {
    const token = action.payload.token
    const { name, image }  = await spotify.getUserInfo(token)
    dispatch(userLoggedIn(token, name, image))
    done()
  }
})

export default [
  gotUserTokenLogic,
]
