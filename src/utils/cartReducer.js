export const initialState = [];

export const ADD = "ADD";

const cartReducer = (state, { payload, type }) => {
  switch (type) {
    case ADD:
      const itemInCartIdx = state.findIndex(
        (item) => item.name === payload.name
      );
      if (itemInCartIdx > -1) {
        let newState = state.slice();
        newState[itemInCartIdx].quantity += payload.quantity;
        return newState;
      }
      return [...state, payload];
    default:
      return initialState;
  }
};

export default cartReducer;
