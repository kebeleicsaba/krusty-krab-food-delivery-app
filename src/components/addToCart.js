import { useState } from "react";
import { Pressable, Text, View } from "react-native";
import useCart from "../hooks/useCart";
import styles from "../styles";
import { Snackbar } from "react-native-paper";
import { AntDesign } from "@expo/vector-icons";

export default function AddToCart({ item }) {
  const [counter, setCounter] = useState(0);
  const [snackBarVisible, setSnackBarVisible] = useState(false);
  const { addToCart } = useCart();
  const onDismissSnackBar = () => {
    setSnackBarVisible(false);
    setCounter(0);
  };

  return (
    <View style={{ flex: 1, alignItems: "center", padding: 10 }}>
      <View
        style={{
          flex: 1,
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <Pressable
          style={{
            ...styles.button,
            borderRadius: 30,
            backgroundColor: "#ff9c9d",
          }}
          onPress={() => counter !== 0 && setCounter(counter - 1)}
        >
          <Text style={styles.buttonText}>-</Text>
        </Pressable>
        <Text style={styles.counterText}>{counter}</Text>
        <Pressable
          style={{ ...styles.button, borderRadius: 30 }}
          onPress={() => setCounter(counter + 1)}
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
          onPress={() => {
            if (counter !== 0) {
              addToCart(item, counter);
              setSnackBarVisible(!snackBarVisible);
            }
          }}
        >
          <Text style={styles.buttonText}>Add to Cart</Text>
        </Pressable>
      </View>
      <Snackbar
        visible={snackBarVisible}
        onDismiss={onDismissSnackBar}
        action={{
          label: <AntDesign name="closecircleo" size={20} color="white" />,
        }}
      >
        {`${counter} ${item} added to cart.`}
      </Snackbar>
    </View>
  );
}
