import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Button, View } from "react-native";
import useUser from "../../hooks/useUser";
import styles from "../../styles";
import LoginScreen from "./Login";
import RegisterScreen from "./Register";

const Stack = createNativeStackNavigator();

function ProfileScreen() {
  const { logout } = useUser();

  return (
    <View style={styles.container}>
      <Button title="Log out" onPress={logout} />
    </View>
  );
}

export default function ProfileStack() {
  const { user } = useUser();

  return (
    <Stack.Navigator>
      {user.token ? (
        <Stack.Screen
          name="ProfileScreen"
          component={ProfileScreen}
          options={{
            title: "Profile",
            headerShadowVisible: false,
          }}
        />
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
