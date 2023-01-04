import { createContext, useEffect, useReducer } from "react";
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
      } catch (error) {
        userToken = null;
      } finally {
        dispatch({ type: INITIALIZE, payload: userToken });
      }
    };
    initialize();
  }, []);

  const authContext = {
    login: async ({ email, password }) => {
      try {
        const { user } = await signInWithEmailAndPassword(
          auth,
          email,
          password
        );
        const token = await user.getIdToken();
        await SecureStore.setItemAsync("userToken", token);
        dispatch({ type: SIGN_IN, payload: token });
      } catch (error) {
        throw new Error("Something's Wrong!");
      }
    },
    logout: async () => {
      await auth.signOut();
      await SecureStore.deleteItemAsync("userToken");
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
        dispatch({ type: SIGN_IN, payload: token });
      } catch (error) {
        throw new Error("Something's Wrong!");
      }
    },
    user,
  };

  return <UserContext.Provider value={authContext} {...props} />;
};

export default UserProvider;
