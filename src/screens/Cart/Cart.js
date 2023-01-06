import { FlatList, Pressable, Text, View } from "react-native";
import useCart from "../hooks/useCart";
import styles from "../styles";
import CartItem from "../components/cartItem";

export default function CartScreen() {
  const { cart, getTotalCost } = useCart();

  return (
    <View
      style={{
        ...styles.container,
        paddingHorizontal: 20,
        paddingVertical: 40,
      }}
    >
      {cart.length != 0 ? (
        <>
          <FlatList
            data={cart}
            renderItem={({ item }) => <CartItem item={item} />}
          />
          <View
            style={{
              alignItems: "flex-end",
              flexDirection: "row",
              justifyContent: "flex-end",
              marginBottom: 20,
            }}
          >
            <Text style={{ fontSize: 30 }}>Total:</Text>
            <Text style={{ fontSize: 26, paddingLeft: 20, minWidth: 100 }}>
              {getTotalCost() + " $"}
            </Text>
          </View>
          <Pressable
            style={{
              ...styles.button,
              paddingVertical: 10,
              paddingHorizontal: 20,
              marginLeft: 10,
            }}
            onPress={() => console.log(cart)}
          >
            <Text style={styles.buttonText}>Check Out</Text>
          </Pressable>
        </>
      ) : (
        <Text>Your cart is empty</Text>
      )}
    </View>
  );
}
