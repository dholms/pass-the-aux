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

// 1 hr
const SPOTIFY_TIMEOUT = 1000 * 60 * 60

function rehydrate() {
  const user = localStorage.getItem("user");
  if (user) {
    const { token, name, image, time = 0 } = JSON.parse(user);
    if(Date.now() - time < SPOTIFY_TIMEOUT){
      return { token, name, image }
    }
  } 
  return defaultState
}

export default (state = rehydrate(), action: UserAction) => {
  switch (action.type) {
    case USER_LOGGED_IN:
      const { token, name, image } = action.payload;
      localStorage.setItem("user", JSON.stringify({ token, name, image, time: Date.now() }));
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
