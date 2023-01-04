import { useState } from "react";
import { Button, StyleSheet, TextInput, View } from "react-native";
import ErrorText from "../../components/errorText";
import useUser from "../../hooks/useUser";

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { login } = useUser();

  function handleLogin() {
    login({ email, password })
      .then(() => {
        setEmail("");
        setError("");
      })
      .catch((err) => setError(err.message));
    setPassword("");
  }

  return (
    <View style={{ backgroundColor: "white", flex: 1, paddingTop: 10 }}>
      <ErrorText errorValue={error} />
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
      <Button
        title="Or Register"
        onPress={() => navigation.navigate("RegisterScreen")}
      />
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
