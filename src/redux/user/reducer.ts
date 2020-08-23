import { UserAction, USER_LOGGED_IN } from "./actions";

export type UserState = {
  token: string | null;
  name: string;
  image: string | null;
};

export const defaultState = {
  token: null,
  name: "Noname",
  image: null,
};

function rehydrate() {
  const user = localStorage.getItem("user");
  if (user) {
    return JSON.parse(user);
  } else {
    return defaultState;
  }
}

export default (state = rehydrate(), action: UserAction) => {
  switch (action.type) {
    case USER_LOGGED_IN:
      const { token, name, image } = action.payload;
      localStorage.setItem("user", JSON.stringify({ token, name, image }));
      return {
        ...state,
        token,
        name,
        image,
      };

    default:
      return state;
  }
};
