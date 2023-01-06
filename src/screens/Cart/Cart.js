import { FlatList, Pressable, Text, View } from "react-native";
import useCart from "../../hooks/useCart";
import styles from "../../styles";
import CartItem from "../../components/cartItem";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import OrderModal from "./Order";

const Stack = createNativeStackNavigator();

function CartScreen({ navigation }) {
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
            onPress={() => navigation.navigate("OrderModal", { cart: cart })}
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

export default function CartStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="CartScreen"
        component={CartScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="OrderModal"
        component={OrderModal}
        options={{ headerShadowVisible: false, title: "Order" }}
      />
    </Stack.Navigator>
  );
}
