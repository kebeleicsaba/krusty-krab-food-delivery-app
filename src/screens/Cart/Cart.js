import { FlatList, Pressable, Text, View } from "react-native";
import useCart from "../../hooks/useCart";
import styles from "../../styles";
import CartItem from "../../components/cartItem";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import OrderModal from "./Order";
import useUser from "../../hooks/useUser";

const Stack = createNativeStackNavigator();

function CartScreen({ navigation }) {
  const { cart, getTotalCost } = useCart();
  const { user } = useUser();

  return (
    <View
      style={{
        ...styles.container,
        paddingHorizontal: 20,
        paddingTop: 40,
        paddingBottom: 11,
      }}
    >
      {cart.length != 0 && (
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
            <Text style={{ fontSize: 28 }}>Total:</Text>
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
              backgroundColor: user.token === null ? "#ff9c9d" : "#fe0002",
            }}
            disabled={user.token === null ? true : false}
            onPress={() => navigation.navigate("OrderModal")}
          >
            <Text style={styles.buttonText}>Check Out</Text>
          </Pressable>
          <Text
            style={{
              paddingHorizontal: 10,
              paddingTop: 5,
              color: "red",
              textAlign: "center",
            }}
          >
            {user.token === null && "You must log in!"}
          </Text>
        </>
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
        options={{
          presentation: "fullScreenModal",
          headerShown: false,
          headerShadowVisible: false,
          title: "Order",
        }}
      />
    </Stack.Navigator>
  );
}
