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
        email = await SecureStore.getItemAsync("userEmail");
      } catch (error) {
        userToken = null;
      } finally {
        dispatch({
          type: INITIALIZE,
          payload: { token: userToken, uid: uid, email: email },
        });
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
          await SecureStore.setItemAsync("userEmail", user.email);
          dispatch({
            type: SIGN_IN,
            payload: { token: token, uid: user.uid, email: user.email },
          });
        } catch (error) {
          if (error.code === "auth/invalid-email")
            throw new Error("Wrong email address!");
          else if (error.code === "auth/wrong-password")
            throw new Error("Wrong password!");
          throw new Error("Something's Wrong!");
        }
      },
      logout: async () => {
        await auth.signOut();
        await SecureStore.deleteItemAsync("userToken");
        await SecureStore.deleteItemAsync("userUID");
        await SecureStore.deleteItemAsync("uerEmail");
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
          console.log(error.code);
          if (error.code === "auth/invalid-email")
            throw new Error("Wrong email address!");
          if (error.code === "auth/weak-password")
            throw new Error("Weak password!");
          if (error.code === "auth/email-already-in-use")
            throw new Error("Email alredy in use!");
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
