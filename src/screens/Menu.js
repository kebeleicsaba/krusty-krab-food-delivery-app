import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useEffect, useState } from "react";
import { FlatList, View } from "react-native";
import MenuItem from "../components/menuItem";
import FoodDetailsScreen from "./FoodDetails";
import { onSnapshot, collection } from "firebase/firestore";
import { db } from "../../config/firebase";

const Stack = createNativeStackNavigator();

function MenuScreen({ navigation }) {
  const [Foods, setFoods] = useState([
    {
      name: "Krabby Patty",
      price: 12,
      image: require("../images/krabby_patty.png"),
    },
    {
      name: "Coral Bits",
      price: 8,
      image: require("../images/coral_bits.png"),
    },
    {
      name: "Kelp Shake",
      price: 5,
      image: require("../images/kelp_shake.png"),
    },
  ]);

  useEffect(() => {
    const unsub = onSnapshot(collection(db, "foods"), (d) => {
      d.forEach((doc) => {
        const data = doc.data()
        console.log(`${doc.id} => ${data.name}`);
        console.log(`${doc.id} => ${data.price}`);
      });
    });
    return () => unsub()
  }, []);

  return (
    <View style={{ backgroundColor: "white", flex: 1 }}>
      <FlatList
        data={Foods}
        renderItem={({ item }) => (
          <MenuItem item={item} navigation={navigation} />
        )}
      />
    </View>
  );
}

export default function MenuStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="MenuScreen"
        component={MenuScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen name="FoodDetails" component={FoodDetailsScreen} />
    </Stack.Navigator>
  );
}
