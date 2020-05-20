import { UserAction, USER_LOGGED_IN } from './actions'

export type UserState = {
  token: string | null
  name: string 
  image: string | null
}

export const defaultState = {
  token: null,
  name: 'Noname',
  image: null
}

export default (state = defaultState, action: UserAction) => {
  switch(action.type) {
    case USER_LOGGED_IN: 
      const { token, name, image } = action.payload
      return {
        ...state,
        token,
        name,
        image
      }

    default:
      return state
  }
}
