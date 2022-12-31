import { SafeAreaProvider } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import Router from "./src/Router";

export default function App() {
  return (
    <SafeAreaProvider>
      <StatusBar style="auto" />
      <Router />
    </SafeAreaProvider>
  );
}
