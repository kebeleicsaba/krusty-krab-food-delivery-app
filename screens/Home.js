import { View, Alert } from "react-native";
import { Button, ThemeProvider } from "react-native-elements";

export default function HomeScreen() {
    return (
        <ThemeProvider>
          <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
            <Button title="Hey!" onPress={() => Alert.alert("Siker!")} />
          </View>
        </ThemeProvider>
      );
  }
