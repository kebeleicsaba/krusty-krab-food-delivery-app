import { SafeAreaProvider } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import Router from "./src/Router";
import Header from "./src/components/header";
import UserProvider from "./src/utils/UserContext";

export default function App() {
  return (
    <SafeAreaProvider>
      <UserProvider>
        <StatusBar style="auto" />
        <Header />
        <Router />
      </UserProvider>
    </SafeAreaProvider>
  );
}
