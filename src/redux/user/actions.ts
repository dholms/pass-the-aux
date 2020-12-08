export const GOT_USER_CODE = 'GOT_USER_CODE'
export const GOT_USER_TOKEN = 'GOT_USER_TOKEN'
export const REFRESH_USER_TOKEN = 'REFRESH_USER_TOKEN'
export const USER_LOGGED_IN = 'USER_LOGGED_IN'
export const ATTEMPTED_LOGIN = 'ATTEMPTED_LOGIN'

interface GotUserCodeAction {
  type: 'GOT_USER_CODE'
  payload: {
    code: string
  }
}

export const gotUserCode = (code: string): GotUserCodeAction => ({
  type: GOT_USER_CODE,
  payload: {
    code
  }
})

interface GotUserTokenAction {
  type: 'GOT_USER_TOKEN'
  payload: {
    token: string
  }
}

export const gotUserToken = (token: string): GotUserTokenAction => ({
  type: GOT_USER_TOKEN,
  payload: {
    token
  }
})

interface RefreshUserTokenAction {
  type: 'REFRESH_USER_TOKEN'
  payload: { }
}

export const refreshUserToken = (): RefreshUserTokenAction => ({
  type: REFRESH_USER_TOKEN,
  payload: { }
})


interface UserLoggedInAction {
  type: 'USER_LOGGED_IN'
  payload: {
    token: string
    name: string
    image: string | null
  }
}

export const userLoggedIn = (token: string, name: string, image: string | null): UserLoggedInAction => ({
  type: USER_LOGGED_IN,
  payload: {
    token,
    name,
    image
  }
})

interface AttemptedLoginAction {
  type: 'ATTEMPTED_LOGIN'
  payload: { }
}

export const attemptedLogin = (): AttemptedLoginAction => ({
  type: ATTEMPTED_LOGIN,
  payload: { }
})



export type UserAction 
  = GotUserCodeAction
  | GotUserTokenAction
  | RefreshUserTokenAction
  | UserLoggedInAction
  | AttemptedLoginAction
