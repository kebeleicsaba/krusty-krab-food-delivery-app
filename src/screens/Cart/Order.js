import { Text, View } from "react-native";
import styles from "../../styles";
import { AntDesign } from "@expo/vector-icons";

export default function OrderModal({ route, navigation }) {
  const cart = route.params.cart;

  return (
    <View style={styles.container}>
      <View style={{ flexDirection: "row", paddingVertical: 40 }}>
        <View style={{ minWidth: 80, alignItems: "center" }}>
          <AntDesign
            name="close"
            size={24}
            color="black"
            onPress={() => navigation.goBack()}
          />
        </View>
        <Text
          style={{
            flex: 1,
            marginRight: 80,
            textAlign: "center",
            fontSize: 18,
            fontWeight: "500",
          }}
        >
          Order
        </Text>
      </View>
      <Text>{JSON.stringify(cart)}</Text>
    </View>
  );
}
