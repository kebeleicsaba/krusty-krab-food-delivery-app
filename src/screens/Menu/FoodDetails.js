import { Image, Text, View } from "react-native";
import { useEffect, useState } from "react";
import styles from "../../styles";
import { getDoc, doc } from "firebase/firestore";
import { db, storage } from "../../../config/firebase";
import { getDownloadURL, ref } from "firebase/storage";
import AddToCart from "../../components/addToCart";
import LoadingEffect from "../../components/loading";

export default function FoodDetailsSrceen({ navigation, route }) {
  const [foodPrice, setFoodPrice] = useState();
  const [foodName, setFoodName] = useState();
  const [foodImage, setFoodImage] = useState(null);
  const [foodDescription, setFoodDescription] = useState("");

  useEffect(() => {
    navigation.setOptions({ title: foodName });
  }, [navigation, foodName]);

  useEffect(() => {
    const getData = async () => {
      const docRef = doc(db, "foods", route.params.id);
      const docSnap = await getDoc(docRef);
      const food = docSnap.data();
      setFoodPrice(food.price);
      setFoodDescription(food.description);
      setFoodName(food.name);
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
    };
    getData();
  }, [db, foodImage]);

  return (
    <>
      {foodImage === null ? (
        <LoadingEffect />
      ) : (
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
      )}
    </>
  );
}
