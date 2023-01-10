import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Pressable, Text, View } from "react-native";
import ProfileOrders from "../../components/profileOrders";
import useUser from "../../hooks/useUser";
import styles from "../../styles";
import LoginScreen from "./Login";
import OrderDetailsScreen from "./OrderDetails";
import RegisterScreen from "./Register";

const Stack = createNativeStackNavigator();

function ProfileScreen({ navigation }) {
  const { logout, user } = useUser();

  return (
    <View style={styles.container}>
      <Text>{JSON.stringify(user.email)}</Text>
      <ProfileOrders uid={user.uid} navigation={navigation} />
      <Pressable
        style={{
          ...styles.button,
          paddingVertical: 10,
          paddingHorizontal: 20,
          marginBottom: 40,
          marginHorizontal: 30,
        }}
        onPress={logout}
      >
        <Text style={styles.buttonText}>Log out</Text>
      </Pressable>
    </View>
  );
}

export default function ProfileStack() {
  const { user } = useUser();

  return (
    <Stack.Navigator>
      {user.token ? (
        <Stack.Group>
          <Stack.Screen
            name="ProfileScreen"
            component={ProfileScreen}
            options={{
              title: "Profile",
              headerShadowVisible: false,
            }}
          />
          <Stack.Screen
            name="OrderDetails"
            component={OrderDetailsScreen}
            options={{ headerShadowVisible: false, title: "Order Details" }}
          />
        </Stack.Group>
      ) : (
        <Stack.Group>
          <Stack.Screen
            name="LoginScreen"
            component={LoginScreen}
            options={{
              headerTitle: "Login",
              headerShadowVisible: false,
            }}
          />
          <Stack.Screen
            name="RegisterScreen"
            component={RegisterScreen}
            options={{
              headerTitle: "Register",
              headerShadowVisible: false,
            }}
          />
        </Stack.Group>
      )}
    </Stack.Navigator>
  );
}
