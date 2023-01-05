import { useState } from "react";
import { Pressable, Text, View } from "react-native";
import useCart from "../hooks/useCart";
import styles from "../styles";

export default function Counter({ item }) {
  const [Counter, setCounter] = useState(0);
  const { addToCart } = useCart();

  return (
    <View
      style={{
        flex: 1,
        flexDirection: "row",
        alignItems: "center",
        marginTop: 20,
      }}
    >
      <Pressable
        style={{
          ...styles.button,
          borderRadius: 30,
          backgroundColor: "#ff9c9d",
        }}
        onPress={() => Counter !== 0 && setCounter(Counter - 1)}
      >
        <Text style={styles.buttonText}>-</Text>
      </Pressable>
      <Text style={styles.counterText}>{Counter}</Text>
      <Pressable
        style={{ ...styles.button, borderRadius: 30 }}
        onPress={() => setCounter(Counter + 1)}
      >
        <Text style={styles.buttonText}>+</Text>
      </Pressable>
      <Pressable
        style={{
          ...styles.button,
          paddingVertical: 10,
          paddingHorizontal: 20,
          marginLeft: 15,
        }}
        onPress={() => Counter !== 0 && addToCart(item, Counter)}
      >
        <Text style={styles.buttonText}>Add to Cart</Text>
      </Pressable>
    </View>
  );
}
