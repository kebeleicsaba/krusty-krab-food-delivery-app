import { Image, Text, View } from "react-native";

export default function ProfileTitle({ email }) {
  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        marginVertical: 15,
        marginHorizontal: 35,
      }}
    >
      <Image
        source={require("../images/avatar.jpg")}
        style={{
          width: 70,
          height: 70,
          borderRadius: 150 / 2,
          overflow: "hidden",
        }}
      />
      <Text style={{ fontSize: 18, fontWeight: "500", paddingLeft: 20 }}>
        {email}
      </Text>
    </View>
  );
}
