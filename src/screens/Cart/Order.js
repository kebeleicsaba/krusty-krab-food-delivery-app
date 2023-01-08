import { Pressable, ScrollView, Text, TextInput, View } from "react-native";
import { useEffect, useState } from "react";
import styles from "../../styles";
import { AntDesign } from "@expo/vector-icons";
import LoadingEffect from "../../components/loading";
import useUser from "../../hooks/useUser";
import useCart from "../../hooks/useCart";
import useLocation from "../../hooks/useLocation";
import MapRoute from "../../components/mapRoute";

export default function OrderModal({ navigation }) {
  const [fullName, setFullName] = useState("");
  const [addressLatitude, setAddressLatitude] = useState(false);
  const [addressLongitude, setAddressLongitude] = useState(false);
  const { location, status } = useLocation();
  const { cart } = useCart();
  const { user } = useUser();

  useEffect(() => {
    if (status === "granted" && location) {
      setAddressLatitude(location.coords.latitude);
      setAddressLongitude(location.coords.longitude);
    }
  }, [addressLongitude, location]);

  return (
    <View style={styles.container}>
      <View style={{ flexDirection: "row", paddingVertical: 40 }}>
        <View style={{ minWidth: 80, alignItems: "center" }}>
          <AntDesign
            name="close"
            size={24}
            color="black"
            onPress={() => navigation.goBack()}
          />
        </View>
        <Text
          style={{
            flex: 1,
            marginRight: 80,
            textAlign: "center",
            fontSize: 18,
            fontWeight: "500",
          }}
        >
          Order
        </Text>
      </View>
      {!addressLongitude || !location ? (
        <LoadingEffect />
      ) : (
        <>
          <ScrollView
            style={{
              flex: 1,
              paddingHorizontal: 20,
              paddingBottom: 20,
            }}
          >
            <Text>{JSON.stringify(cart)}</Text>
            <Text>uid: {user.uid}</Text>

            <Text> Full name:</Text>
            <TextInput
              style={styles.input}
              value={fullName}
              onChangeText={setFullName}
              placeholder="Full name"
            />
            <Text> Address:</Text>
            <MapRoute
              addressCoords={{
                latitude: addressLatitude,
                longitude: addressLongitude,
              }}
            />
          </ScrollView>
          <Pressable
            style={{
              ...styles.button,
              paddingVertical: 10,
              paddingHorizontal: 20,
              marginBottom: 40,
              marginHorizontal: 30,
            }}
            onPress={() => null}
          >
            <Text style={styles.buttonText}>Order Now</Text>
          </Pressable>
        </>
      )}
    </View>
  );
}
