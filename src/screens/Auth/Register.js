import { useState } from "react";
import { Button, StyleSheet, TextInput, View } from "react-native";
import ErrorText from "../../components/errorText";
import useUser from "../../hooks/useUser";

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
    <View style={{ backgroundColor: "white", flex: 1 }}>
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
        onSubmitEditing={handleRegister}
      />
      <Button title="Register" onPress={handleRegister} />
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
