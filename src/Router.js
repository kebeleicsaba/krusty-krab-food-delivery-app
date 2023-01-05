import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { MaterialIcons, Foundation, FontAwesome } from "@expo/vector-icons";
import MenuStack from "./screens/Menu";
import EmptyCartScreen from "./screens/EmptyCart";
import CartScreen from "./screens/Cart";
import ProfileStack from "./screens/Profile";
import useCart from "./hooks/useCart";

const Tab = createBottomTabNavigator();

export default function Router() {
  const { cart, getItemsCount } = useCart();

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
          component={cart.length !== 0 ? CartScreen : EmptyCartScreen}
          options={{
            tabBarIcon: ({ color, size }) => (
              <Foundation name="shopping-cart" color={color} size={size} />
            ),
            headerShown: false,
            tabBarBadge: cart.length !== 0 ? getItemsCount() : null,
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
