import { ATTEMPTED_LOGIN, UserAction, USER_LOGGED_IN } from "./actions";

export type UserState = {
  token: string | null;
  name: string;
  image: string | null;
  attemptedLogin: true
};

export const defaultState = {
  token: null,
  name: "Noname",
  image: null,
  attemptedLogin: false
};

export default (state = defaultState, action: UserAction) => {
  switch (action.type) {
    case ATTEMPTED_LOGIN:
      return {
        ...state,
        attemptedLogin: true
      }

    case USER_LOGGED_IN:
      const { token, name, image } = action.payload;
      return {
        ...state,
        token,
        name,
        image,
        attemptedLogin: true
      };

    default:
      return state;
  }
};
