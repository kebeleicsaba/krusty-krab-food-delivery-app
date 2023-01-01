import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Button, Text, View } from "react-native";
import useUser from "../hooks/useUser";
import LoginScreen from "./Auth/Login";
import RegisterScreen from "./Auth/Register";

const Stack = createNativeStackNavigator();

function ProfileScreen() {
  const { logout } = useUser()


  return (
    <View style={{ backgroundColor: "white", flex: 1, justifyContent: 'center' }}>
      <Text>Profile</Text>
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
            headerShown: false,
          }}
        />
      ) : (
        <Stack.Group>
          <Stack.Screen
            name="LoginScreen"
            component={LoginScreen}
            options={{
              headerTitle: 'Login',
              headerShadowVisible: false,
            }}
          />
          <Stack.Screen
            name="RegisterScreen"
            component={RegisterScreen}
            options={{
              headerTitle: 'Register',
              headerShadowVisible: false,
            }}
          />
        </Stack.Group>
      )}
    </Stack.Navigator>
  );
}
