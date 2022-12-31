import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import CartScreen from "./screens/Cart";
import ProfileScreen from "./screens/Profile";
import { MaterialIcons, Foundation, FontAwesome } from "@expo/vector-icons";
import MenuStack from "./screens/Menu";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <SafeAreaProvider>
      <StatusBar />
      <NavigationContainer>
        <Tab.Navigator
          screenOptions={{
            tabBarActiveTintColor: "#7C1015",
          }}
        >
          <Tab.Screen
            name="Menu"
            component={MenuStack}
            options={{
              tabBarIcon: ({ color, size }) => (
                <MaterialIcons
                  name="restaurant-menu"
                  color={color}
                  size={size}
                />
              ),
              headerShown: false,
            }}
          />
          <Tab.Screen
            name="Cart"
            component={CartScreen}
            options={{
              tabBarIcon: ({ color, size }) => (
                <Foundation name="shopping-cart" color={color} size={size} />
              ),
            }}
          />
          <Tab.Screen
            name="Profile"
            component={ProfileScreen}
            options={{
              tabBarIcon: ({ color, size }) => (
                <FontAwesome name="user" color={color} size={size} />
              ),
            }}
          />
        </Tab.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}
