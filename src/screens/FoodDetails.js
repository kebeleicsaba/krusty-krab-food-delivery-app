import { Text, View } from "react-native";
import { useEffect, useState } from "react";

export default function FoodDetailsSrceen({ navigation, route }) {
  const [menuItem, setMenuItem] = useState();

  useEffect(() => {
    navigation.setOptions({ title: route.params.name });
  }, [navigation, menuItem]);

  return (
    <View>
      <Text>lorem ipsum</Text>
    </View>
  );
}
