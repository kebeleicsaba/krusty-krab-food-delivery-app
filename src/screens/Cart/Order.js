import { Text, View } from "react-native";
import styles from "../../styles";

export default function OrderModal({ route }) {
  const cart = route.params.cart;

  return (
    <View style={styles.container}>
      <Text>{JSON.stringify(cart)}</Text>
    </View>
  );
}
