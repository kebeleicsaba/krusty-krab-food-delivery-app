import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import MenuScreen from "./screens/Menu";
import CartScreen from "./screens/Cart";
import ProfileScreen from "./screens/Profile";
import { MaterialIcons, Foundation, FontAwesome } from "@expo/vector-icons";

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={{
          tabBarActiveTintColor: "#7C1015",
        }}
      >
        <Tab.Screen
          name="Menu"
          component={MenuScreen}
          options={{
            tabBarIcon: ({ color, size }) => (
              <MaterialIcons name="restaurant-menu" color={color} size={size} />
            ),
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
  );
}
