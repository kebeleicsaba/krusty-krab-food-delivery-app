import { createContext, useEffect, useMemo, useReducer } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "../../config/firebase";
import * as SecureStore from "expo-secure-store";
import userReducer, {
  INITIALIZE,
  initialState as userInitialState,
  SIGN_IN,
  SIGN_OUT,
} from "./userReducer";

export const UserContext = createContext();

const UserProvider = (props) => {
  const [user, dispatch] = useReducer(userReducer, userInitialState);

  useEffect(() => {
    const initialize = async () => {
      let userToken;
      try {
        userToken = await SecureStore.getItemAsync("userToken");
        uid = await SecureStore.getItemAsync("userUID");
      } catch (error) {
        userToken = null;
      } finally {
        dispatch({ type: INITIALIZE, payload: { token: userToken, uid: uid} });
      }
    };
    initialize();
  }, []);

  const authContext = useMemo(
    () => ({
      login: async ({ email, password }) => {
        try {
          const { user } = await signInWithEmailAndPassword(
            auth,
            email,
            password
          );
          const token = await user.getIdToken();
          await SecureStore.setItemAsync("userToken", token);
          await SecureStore.setItemAsync("userUID", user.uid);
          dispatch({ type: SIGN_IN, payload: { token: token, uid: user.uid } });
        } catch (error) {
          throw new Error("Something's Wrong!");
        }
      },
      logout: async () => {
        await auth.signOut();
        await SecureStore.deleteItemAsync("userToken");
        await SecureStore.deleteItemAsync("userUID");
        dispatch({ type: SIGN_OUT });
      },
      register: async ({ email, password }) => {
        try {
          const { user } = await createUserWithEmailAndPassword(
            auth,
            email,
            password
          );
          const token = await user.getIdToken();
          await SecureStore.setItemAsync("userToken", token);
          await SecureStore.setItemAsync("userUID", user.uid);
          dispatch({ type: SIGN_IN, payload: token });
        } catch (error) {
          throw new Error("Something's Wrong!");
        }
      },
      user,
    }),
    [user]
  );

  return <UserContext.Provider value={authContext} {...props} />;
};

export default UserProvider;
