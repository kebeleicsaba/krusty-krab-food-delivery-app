import { SafeAreaProvider } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import Router from "./src/Router";
import Header from "./src/components/header";
import UserProvider from "./src/utils/UserContext";
import CartProvider from "./src/utils/CartContext";
import LocationProvider from "./src/utils/LocationContext";

export default function App() {
  return (
    <SafeAreaProvider>
      <LocationProvider>
        <UserProvider>
          <CartProvider>
            <StatusBar style="auto" />
            <Header />
            <Router />
          </CartProvider>
        </UserProvider>
      </LocationProvider>
    </SafeAreaProvider>
  );
}
