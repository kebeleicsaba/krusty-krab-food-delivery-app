import { Image, Text, View } from "react-native";
import styles from "../styles";

export default function EmptyCartScreen() {
  return (
    <View
      style={{
        ...styles.container,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Image
        style={{
          width: 120,
          maxHeight: 170,
          resizeMode: "contain",
          marginRight: 10,
        }}
        source={require("../images/empty_cart.png")}
      />
      <Text
        style={{
          fontSize: 26,
          paddingBottom: 50,
          color: "#8e8e8f",
          fontWeight: "bold",
        }}
      >
        Your cart is empty
      </Text>
    </View>
  );
}
