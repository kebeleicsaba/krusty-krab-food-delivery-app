import { useState } from "react";
import { Pressable, Text, TextInput, View } from "react-native";
import useUser from "../../hooks/useUser";
import styles from "../../styles";

export default function RegisterScreen({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { register } = useUser();

  function handleRegister() {
    register({ email, password })
      .then(() => {
        setEmail("");
        setPassword("");
        setError("");
        navigation.navigate("LoginScreen");
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
        />
      </View>

      <Pressable
        style={{
          ...styles.button,
          paddingVertical: 10,
          paddingHorizontal: 20,
          marginBottom: 40,
          marginHorizontal: 30,
        }}
        onPress={handleRegister}
      >
        <Text style={styles.buttonText}>Register</Text>
      </Pressable>
    </View>
  );
}
