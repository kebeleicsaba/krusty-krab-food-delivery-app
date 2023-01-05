import { Image, View } from "react-native";
import styles from "../styles";
import * as Animatable from "react-native-animatable";

export default function LoadingScreen() {
  const pulse = {
    0: {
      scale: 1,
    },
    0.5: {
      scale: 1.3,
    },
    1: {
      scale: 1,
    },
  };

  return (
    <View
      style={{
        ...styles.container,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Animatable.View
        animation={pulse}
        iterationCount="infinite"
        style={{ paddingBottom: 20 }}
      >
        <Image
          source={require("../images/loading.png")}
          style={{ width: 200, resizeMode: "contain" }}
        />
      </Animatable.View>
    </View>
  );
}
