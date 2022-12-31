import { View, Alert, Text } from "react-native";
import {
  Button,
  ThemeProvider,
} from "react-native-elements";

export default function CartScreen() {
  return (
    <ThemeProvider>
      <View
        style={{
          borderWidth: 0,
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Button title="Hey!" onPress={() => Alert.alert("Cart!")} />        
      </View>
    </ThemeProvider>
  );
}
