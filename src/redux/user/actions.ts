export const GOT_USER_TOKEN = 'GOT_USER_TOKEN'
export const USER_LOGGED_IN = 'USER_LOGGED_IN'

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

export type UserAction 
  = GotUserTokenAction
  | UserLoggedInAction
