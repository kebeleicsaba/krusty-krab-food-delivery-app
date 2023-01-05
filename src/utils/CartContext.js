import { createContext, useMemo, useReducer } from "react";
import cartReducer, {
  ADD,
  initialState as CartInitialState,
} from "./cartReducer";

export const CartContext = createContext();

const CartProvider = (props) => {
  const [cart, dispatch] = useReducer(cartReducer, CartInitialState);

  const cartContext = useMemo(
    () => ({
      addToCart: (itemName, quantity) => {
        console.log(itemName, quantity);
        dispatch({
          type: ADD,
          payload: { name: itemName, quantity: quantity },
        });
      },
      cart,
    }),
    [cart]
  );

  return <CartContext.Provider value={cartContext} {...props} />;
};

export default CartProvider;
