import { Text, View } from "react-native";
import useCart from "../hooks/useCart";

export default function CartScreen() {
  const { cart } = useCart();

  return (
    <View style={{ backgroundColor: "white", flex: 1 }}>
        <Text>{JSON.stringify(cart)}</Text>
    </View>
  );
}
