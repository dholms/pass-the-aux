export const USER_LOGGED_IN = 'USER_LOGGED_IN'

interface UserLoggedInAction {
  type: 'USER_LOGGED_IN'
  payload: {
    token: string
  }
}

export const userLoggedIn = (token: string): UserLoggedInAction => ({
  type: USER_LOGGED_IN,
  payload: {
    token
  }
})

export type UserAction = UserLoggedInAction
