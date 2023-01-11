import { Image } from "react-native";
import { ListItem } from "@react-native-material/core";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";

export default function MenuItem({ item, navigation }) {
  return (
    <ListItem
      leadingMode="avatar"
      leading={
        <Image
          style={{
            width: 60,
            height: 60,
            resizeMode: "center",
          }}
          source={item.image}
        />
      }
      title={item.name}
      secondaryText={item.price + " $"}
      trailing={(props) => <Icon name="chevron-right" {...props} />}
      onPress={() => {
        navigation.navigate("FoodDetails", { id: item.id });
      }}
    />
  );
}
