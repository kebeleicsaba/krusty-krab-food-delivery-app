import { Image, Text, View } from "react-native";
import { useEffect, useState } from "react";
import styles from "../styles";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db, storage } from "../../config/firebase";
import { getDownloadURL, ref } from "firebase/storage";

export default function FoodDetailsSrceen({ navigation, route }) {
  const [FoodName, setFoodName] = useState(route.params.name);
  const [FoodPrice, setFoodPrice] = useState();
  const [FoodImage, setFoodImage] = useState("");
  const [FoodDescription, setFoodDescription] = useState("");

  useEffect(() => {
    navigation.setOptions({ title: route.params.name });
  }, [navigation, FoodName]);

  useEffect(() => {
    const q = query(
      collection(db, "foods"),
      where("name", "==", route.params.name)
    );
    getData = async () => {
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        const food = doc.data();
        setFoodPrice(food.price);
        setFoodDescription(food.description);
        getDownloadURL(ref(storage, food.image)).then((url) => {
          const xhr = new XMLHttpRequest();
          xhr.responseType = "blob";
          xhr.onload = (event) => {
            const blob = xhr.response;
          };
          xhr.open("GET", url);
          xhr.send();
          setFoodImage({ uri: url });
        });
      });
    };
    getData();
  }, [db]);

  return (
    <View style={{ ...styles.container, alignItems: "center" }}>
      <Image
        style={{
          width: 150,
          height: 150,
          resizeMode: "center",
          marginTop: 20,
        }}
        source={FoodImage}
      />
      <Text
        style={{
          fontSize: 16,
          margin: 20,
          textAlign: "justify",
        }}
      >
        {FoodDescription}
      </Text>
      <Text style={{ color: "gray" }}>Price: {FoodPrice} $</Text>
    </View>
  );
}
