import { createContext, useReducer } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../config/firebase";
import * as SecureStore from 'expo-secure-store';
import userReducer, { initialState as userInitialState, SIGN_IN, SIGN_OUT } from "./userReducer";

export const UserContext = createContext();

const UserProvider = (props) => {
  const [user, dispatch] = useReducer(userReducer, userInitialState)

  const authContext = {
    login: async ({ email, password }) => {
        const { user } = await signInWithEmailAndPassword(auth, email, password)
        const token = await user.getIdToken()
        await SecureStore.setItemAsync('userToken', token)
        dispatch({ type: SIGN_IN, payload: token })
    },
    logout: async () => {
        await auth.signOut()
        await SecureStore.deleteItemAsync('userToken')
        dispatch({ type: SIGN_OUT })
    },
    user,
  };

  return <UserContext.Provider value={authContext} {...props} />;
};

export default UserProvider;
