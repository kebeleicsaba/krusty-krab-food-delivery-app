import { Text } from "react-native";

export default function ErrorText({ errorValue }) {
  return (
    <Text
      style={{
        color: "red",
        paddingLeft: 10,
        paddingTop: 20,
      }}
    >
      {errorValue}
    </Text>
  );
}
