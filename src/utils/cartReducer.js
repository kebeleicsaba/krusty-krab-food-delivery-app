export const initialState = [];

export const ADD = "ADD";
export const REMOVE = "REMOVE";

const cartReducer = (state, { payload, type }) => {
  const itemInCartIdx = state.findIndex((item) => item.name === payload.name);
  let newState = state.slice();

  switch (type) {
    case ADD:
      if (itemInCartIdx > -1) {
        newState[itemInCartIdx].quantity += payload.quantity;
        return newState;
      }
      return [...state, payload];
    case REMOVE:
      if (
        newState[itemInCartIdx].quantity > 1 &&
        newState[itemInCartIdx].quantity !== payload.quantity
      ) {
        newState[itemInCartIdx].quantity -= payload.quantity;
      } else {
        return state.filter((item) => item.name !== payload.name);
      }
      return newState;
    default:
      return initialState;
  }
};

export default cartReducer;
