import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useEffect, useState } from "react";
import { FlatList, View } from "react-native";
import MenuItem from "../../components/menuItem";
import FoodDetailsScreen from "./FoodDetails";
import { onSnapshot, collection } from "firebase/firestore";
import { db, storage } from "../../../config/firebase";
import { ref, getDownloadURL } from "firebase/storage";
import styles from "../../styles";
import LoadingEffect from "../../components/loading";

const Stack = createNativeStackNavigator();

function MenuScreen({ navigation }) {
  const [foods, setFoods] = useState([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const handleData = (snapshot) => {
      if (!loaded) {
        snapshot.forEach((doc) => {
          const data = doc.data();
          getDownloadURL(ref(storage, data.image)).then((url) => {
            const xhr = new XMLHttpRequest();
            xhr.responseType = "blob";
            xhr.onload = (event) => {
              const blob = xhr.response;
            };
            xhr.open("GET", url);
            xhr.send();

            setFoods((prevState) => [
              ...prevState,
              {
                id: doc.id,
                name: data.name,
                price: data.price,
                image: { uri: url },
              },
            ]);
          });
        });
        setLoaded(true)
      }
    };

    const unsub = onSnapshot(collection(db, "foods"), handleData);
    return () => unsub();
  }, [db]);

  return (
    <>
      {!loaded ? (
        <LoadingEffect />
      ) : (
        <View style={{ ...styles.container, paddingHorizontal: 10 }}>
          <FlatList
            data={foods.sort((a, b) => b.price - a.price)}
            renderItem={({ item }) => (
              <MenuItem item={item} navigation={navigation} />
            )}
          />
        </View>
      )}
    </>
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
      <Stack.Screen
        name="FoodDetails"
        component={FoodDetailsScreen}
        options={{ headerShadowVisible: false }}
      />
    </Stack.Navigator>
  );
}
