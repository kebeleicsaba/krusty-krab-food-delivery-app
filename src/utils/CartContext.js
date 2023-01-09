import { collection, getDocs, query, where } from "firebase/firestore";
import { createContext, useMemo, useReducer } from "react";
import { db } from "../../config/firebase";
import cartReducer, {
  ADD,
  initialState as CartInitialState,
  REMOVE,
  RESET,
} from "./cartReducer";

export const CartContext = createContext();

const CartProvider = (props) => {
  const [cart, dispatch] = useReducer(cartReducer, CartInitialState);

  const cartContext = useMemo(
    () => ({
      cartReset: () => dispatch({ type: RESET, payload: {} }),
      addToCart: async (itemName, quantity) => {
        const q = query(collection(db, "foods"), where("name", "==", itemName));
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
          const food = doc.data();
          dispatch({
            type: ADD,
            payload: { name: itemName, quantity: quantity, price: food.price },
          });
        });
      },
      removeFromCart: (itemName, quantity) => {
        dispatch({
          type: REMOVE,
          payload: { name: itemName, quantity },
        });
      },
      getItemsCount: () =>
        cart
          .map((item) => item.quantity)
          .reduce((accumulator, current) => accumulator + current, 0),
      getTotalCost: () =>
        cart
          .map((item) => item.quantity * item.price)
          .reduce((accumulator, current) => accumulator + current, 0),
      cart,
    }),
    [cart]
  );

  return <CartContext.Provider value={cartContext} {...props} />;
};

export default CartProvider;
