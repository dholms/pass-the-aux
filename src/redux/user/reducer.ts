import { ATTEMPTED_LOGIN, GOT_USER_TOKEN, UserAction, USER_LOGGED_IN, HAD_INTERACTION } from "./actions";

export type UserState = {
  token: string | null;
  refresh: string | null;
  name: string;
  image: string | null;
  userLoaded: boolean
  attemptedLogin: true
  hasInteracted: boolean
};

export const defaultState = {
  token: null,
  refresh: null,
  name: "Noname",
  image: null,
  userLoaded: false,
  attemptedLogin: false,
  hasInteracted: false
};

export default (state = defaultState, action: UserAction) => {
  switch (action.type) {
    case ATTEMPTED_LOGIN: {
      return {
        ...state,
        attemptedLogin: true
      }
    }

    case USER_LOGGED_IN: {
      const { token, name, image } = action.payload;
      return {
        ...state,
        token,
        name,
        image,
        attemptedLogin: true,
        userLoaded: true
      };
    }
 
    case GOT_USER_TOKEN: {
      const { token, refresh } = action.payload
      return {
        ...state,
        token,
        refresh
      }
    }

    case HAD_INTERACTION: {
      return {
        ...state,
        hasInteracted: true
      }

    }

    default:
      return state;
  }
};
