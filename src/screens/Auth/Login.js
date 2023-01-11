import { useState } from "react";
import { Pressable, Text, TextInput, View } from "react-native";
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
        setPassword("");
        setError("");
      })
      .catch((err) => {
        setError(err.message);
        setPassword("");
      });
  }

  return (
    <View style={styles.container}>
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          paddingHorizontal: 20,
          paddingBottom: 20,
        }}
      >
        <Text style={{ color: "red", paddingBottom: 10 }}>{error}</Text>
        <Text> Email:</Text>
        <TextInput
          style={styles.input}
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />
        <Text> Password:</Text>
        <TextInput
          style={styles.input}
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          onSubmitEditing={handleLogin}
        />
      </View>

      <Pressable
        style={{ ...styles.button, paddingVertical: 10, marginHorizontal: 30 }}
        onPress={handleLogin}
      >
        <Text style={styles.buttonText}>Login</Text>
      </Pressable>
      <Pressable
        style={{
          ...styles.button,
          paddingVertical: 10,
          paddingHorizontal: 20,
          marginTop: 15,
          marginBottom: 40,
          marginHorizontal: 30,
        }}
        onPress={() => {
          setEmail("");
          setError("");
          setPassword("");
          navigation.navigate("RegisterScreen");
        }}
      >
        <Text style={styles.buttonText}>Register Here</Text>
      </Pressable>
    </View>
  );
}
