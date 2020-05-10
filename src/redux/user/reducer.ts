import { UserAction, USER_LOGGED_IN } from './actions'

export type UserState = {
  token: string | null
}

export const defaultState = {
  token: null
}

export default (state = defaultState, action: UserAction) => {
  switch(action.type) {
    case USER_LOGGED_IN: 
      return {
        ...state,
        token: action.payload.token
      }

    default:
      return state
  }
}
