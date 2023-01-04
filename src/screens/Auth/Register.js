import { useState } from "react";
import { Button, Text, TextInput, View } from "react-native";
import useUser from "../../hooks/useUser";
import styles from "../../styles";

export default function RegisterScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { register } = useUser();

  function handleRegister() {
    register({ email, password })
      .then(() => {
        setEmail("");
        setError("");
      })
      .catch((err) => setError(err.message));
    setPassword("");
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
        onSubmitEditing={handleRegister}
      />
      <Button title="Register" onPress={handleRegister} />
    </View>
  );
}
