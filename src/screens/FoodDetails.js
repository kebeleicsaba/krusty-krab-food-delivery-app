import { Image, Text, View } from "react-native";
import { useEffect, useState } from "react";
import styles from "../styles";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db, storage } from "../../config/firebase";
import { getDownloadURL, ref } from "firebase/storage";
import AddToCart from "../components/addToCart";

export default function FoodDetailsSrceen({ navigation, route }) {
  const [foodPrice, setFoodPrice] = useState();
  const [foodImage, setFoodImage] = useState("");
  const [foodDescription, setFoodDescription] = useState("");

  useEffect(() => {
    navigation.setOptions({ title: route.params.name });
  }, [navigation]);

  useEffect(() => {
    const q = query(
      collection(db, "foods"),
      where("name", "==", route.params.name)
    );
    const getData = async () => {
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
      <View style={{ flex: 2, alignItems: "center" }}>
        <Image
          style={{
            width: 170,
            height: 170,
            resizeMode: "center",
            marginTop: 20,
          }}
          source={foodImage}
        />
        <Text
          style={{
            fontSize: 16,
            margin: 15,
            textAlign: "justify",
          }}
        >
          {foodDescription}
        </Text>
        <Text style={{ color: "gray" }}>Price: {foodPrice} $</Text>
      </View>
      <AddToCart item={route.params.name} />
    </View>
  );
}
