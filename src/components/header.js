import { Image, View } from "react-native";

export default function Header() {
  return (
    <View style={{ height: 110, backgroundColor: "white" }}>
      <Image
        style={{
          top: -85,
          alignSelf: "center",
          width: 110,
          resizeMode: "contain",
        }}
        source={require("../images/logo.png")}
      />
    </View>
  );
}
