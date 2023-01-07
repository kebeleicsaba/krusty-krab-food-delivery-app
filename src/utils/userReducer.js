export const initialState = {
  token: null,
  uid: null,
  isLoading: true,
};

export const SIGN_IN = "SIGN_IN";
export const SIGN_OUT = "SIGN_OUT";
export const INITIALIZE = "INITIALIZE";

const userReducer = (state, { payload, type }) => {
  switch (type) {
    case SIGN_IN:
      return { ...state, token: payload.token, uid: payload.uid, error: null };
    case SIGN_OUT:
      return { ...state, token: null, uid: null, error: null };
    case INITIALIZE:
      return {
        ...state,
        isLoading: false,
        token: payload.token,
        uid: payload.uid,
        error: null,
      };
    default:
      return initialState;
  }
};

export default userReducer;
