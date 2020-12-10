import { createLogic } from 'redux-logic'
import { 
  GOT_USER_CODE, GOT_USER_TOKEN, REFRESH_USER_TOKEN, 
  userLoggedIn, gotUserToken, refreshUserToken, attemptedLogin 
} from './actions'
import spotify from '../../spotify'
import { ProcessOpts } from '../types'

const gotUserCodeLogic = createLogic({
  type: GOT_USER_CODE,
  async process({ getState, action }: ProcessOpts, dispatch, done) {
    const { code } = action.payload
    const { access_token, refresh_token, expires_in } = await spotify.auth.getUserToken(code)
    localStorage.setItem('refresh_token', refresh_token)
    localStorage.setItem('expires_at', (Date.now() + expires_in * 1000).toString())
    dispatch(gotUserToken(access_token, refresh_token))
    done()
  }
})

const gotUserTokenLogic = createLogic({
  type: GOT_USER_TOKEN,
  warnTimeout: 0,
  async process({ getState, action }: ProcessOpts, dispatch, done) {
    const { token } = action.payload
    const { name, image }  = await spotify.getUserInfo(token)
    dispatch(userLoggedIn(token, name, image))

    const REFRESH_INTERVAL = 1000*60*55 // 55 min
    setTimeout(() => {
      dispatch(refreshUserToken())
    }, REFRESH_INTERVAL)
  }
})

const refreshUserTokenLogic = createLogic({
  type: REFRESH_USER_TOKEN,
  async process({ getState, action }: ProcessOpts, dispatch, done) {
    const refreshToken = localStorage.getItem('refresh_token')
    if(!refreshToken){
      console.log("No session available")
      dispatch(attemptedLogin())
      done()
      return
    }
    try {
      const { access_token, refresh_token, expires_in } = await spotify.auth.refreshUserToken(refreshToken)
      localStorage.setItem('refresh_token', refresh_token)
      localStorage.setItem('expires_at', (Date.now() + expires_in * 1000).toString())
      dispatch(gotUserToken(access_token, refresh_token))
    } catch(err) {
      dispatch(attemptedLogin())
    }
    done()
  }
})


export default [
  gotUserCodeLogic,
  gotUserTokenLogic,
  refreshUserTokenLogic,
]
