import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { MaterialIcons, Foundation, FontAwesome } from "@expo/vector-icons";
import MenuStack from "./screens/Menu";
import CartScreen from "./screens/Cart";
import ProfileStack from "./screens/Profile";
import LoadingScreen from "./screens/loading";

const Tab = createBottomTabNavigator();

export default function Router() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={{
          tabBarActiveTintColor: "#FE0002",
        }}
      >
        <Tab.Screen
          name="Menu"
          component={MenuStack}
          options={{
            tabBarIcon: ({ color, size }) => (
              <MaterialIcons name="restaurant-menu" color={color} size={size} />
            ),
            headerShown: false,
          }}
        />
        <Tab.Screen
          name="Cart"
          component={LoadingScreen}
          options={{
            tabBarIcon: ({ color, size }) => (
              <Foundation name="shopping-cart" color={color} size={size} />
            ),
            headerShown: false,
          }}
        />
        <Tab.Screen
          name="Profile"
          component={ProfileStack}
          options={{
            tabBarIcon: ({ color, size }) => (
              <FontAwesome name="user" color={color} size={size} />
            ),
            headerShown: false,
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
