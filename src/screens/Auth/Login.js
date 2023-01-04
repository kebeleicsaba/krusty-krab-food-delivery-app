import { useState } from "react";
import { Button, Text, TextInput, View } from "react-native";
import useUser from "../../hooks/useUser";
import styles from "../../styles";

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
        setPassword("");
      })
      .catch((err) => setError(err.message));
  }

  return (
    <View style={styles.container}>
      <Text style={styles.errorText}>{error}</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
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
        onPress={() => {
          navigation.navigate("RegisterScreen");
          setEmail("");
          setError("");
          setPassword("");
        }}
      />
    </View>
  );
}
