import { useState } from "react";
import {
  Button,
  StyleSheet,
  TextInput,
  View,
} from "react-native";
import useUser from "../../hooks/useUser";

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState("b@b.com");
  const [password, setPassword] = useState("123456");
  const {login} = useUser()

  function handleLogin() {
    login({ email, password });
  }

  return (
    <View style={{ backgroundColor: "white", flex: 1, paddingTop:10 }}>
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        onSubmitEditing={handleLogin}
      />
      <Button title="Login" onPress={handleLogin} />
      <Button title="Or Register" onPress={() => (navigation.navigate("RegisterScreen"))} />
    </View>
  );
}

const styles = StyleSheet.create({
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
  },
});
