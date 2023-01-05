import { Pressable, Text, View } from "react-native";
import useCart from "../hooks/useCart";
import styles from "../styles";
import { AntDesign } from "@expo/vector-icons";

export default function CartItem({ item }) {
  const { addToCart, removeFromCart } = useCart();

  return (
    <View
      style={{
        flexDirection: "row",
        paddingVertical: 10,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <AntDesign
        name="close"
        size={24}
        color="black"
        style={{ paddingLeft: 5, paddingRight: 20 }}
        onPress={() => removeFromCart(item.name, item.quantity)}
      />
      <View style={{ flex: 1, justifyContent: "center" }}>
        <Text style={{ fontSize: 18 }}>{item.name}</Text>
        <Text style={{ fontSize: 14 }}>
          {item.quantity * item.price + " $"}
        </Text>
      </View>
      <View
        style={{
          alignSelf: "flex-end",
          flexDirection: "row",
          alignItems: "center",
          marginVertical: 5,
        }}
      >
        <Pressable
          style={{
            ...styles.button,
            borderRadius: 30,
            backgroundColor: "#ff9c9d",
          }}
          onPress={() => removeFromCart(item.name, 1)}
        >
          <Text style={styles.buttonText}>-</Text>
        </Pressable>
        <Text style={styles.counterText}>{item.quantity}</Text>
        <Pressable
          style={{ ...styles.button, borderRadius: 30 }}
          onPress={() => addToCart(item.name, 1)}
        >
          <Text style={styles.buttonText}>+</Text>
        </Pressable>
      </View>
    </View>
  );
}
