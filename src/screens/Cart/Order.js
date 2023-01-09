import { Pressable, ScrollView, Text, TextInput, View } from "react-native";
import { useEffect, useState } from "react";
import styles from "../../styles";
import { AntDesign } from "@expo/vector-icons";
import LoadingEffect from "../../components/loading";
import useUser from "../../hooks/useUser";
import useCart from "../../hooks/useCart";
import useLocation from "../../hooks/useLocation";
import MapRoute from "../../components/mapRoute";
import Constants from "expo-constants";
import Geocoder from "react-native-geocoding";
import Costs from "../../components/costs";
import { addDoc, collection, GeoPoint } from "firebase/firestore";
import { db } from "../../../config/firebase";

const { config } = Constants.manifest.extra;
Geocoder.init(config.googleMapsApiKey, { language: "en" });

export default function OrderModal({ navigation }) {
  const [fullName, setFullName] = useState("");
  const [addressLatitude, setAddressLatitude] = useState(false);
  const [addressLongitude, setAddressLongitude] = useState(false);
  const [address, setAddress] = useState("");
  const [addressChanged, setAddressChanged] = useState(false);
  const [duration, setDuration] = useState();
  const { location, status, geoError, setGeoError } = useLocation();
  const { cart, getTotalCost, cartReset } = useCart();
  const { user } = useUser();

  const calcDeliveryCost =
    duration < 31 || !duration || addressChanged ? 5 : Math.ceil(duration);

  const newAddress = () => {
    if (address) {
      Geocoder.from(address)
        .then((json) => {
          const newCoords = json.results[0].geometry.location;
          setAddressLatitude(newCoords.lat);
          setAddressLongitude(newCoords.lng);
          setGeoError(false);
          setAddressChanged(!addressChanged);
        })
        .catch(() => setGeoError("Wrong address!"));
    }
  };

  useEffect(() => {
    if (status === "granted" && location) {
      setAddressLatitude(location.coords.latitude);
      setAddressLongitude(location.coords.longitude);
      Geocoder.from(location.coords)
        .then((json) => {
          setAddress(json.results[0].formatted_address);
          setGeoError(false);
        })
        .catch(() => setGeoError("Wrong address!"));
    }
  }, [location]);

  const addOrder = async (order) =>
    await addDoc(collection(db, "orders"), order);

  return (
    <View style={styles.container}>
      <View style={{ flexDirection: "row", paddingTop: 40, marginBottom: 30 }}>
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
      {!addressLongitude && status === "granted" && address === "" ? (
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
            <Text> Full name:</Text>
            <TextInput
              style={styles.input}
              value={fullName}
              onChangeText={setFullName}
              placeholder="Full name"
            />

            <Text>
              {" "}
              Address:{" "}
              {geoError && <Text style={{ color: "red" }}>{geoError}</Text>}
            </Text>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                paddingBottom: 8,
                paddingTop: 3,
              }}
            >
              <TextInput
                style={{
                  ...styles.input,
                  marginBottom: 0,
                  marginTop: 0,
                  flex: 1,
                }}
                placeholder="Your address"
                value={address}
                onSubmitEditing={newAddress}
                onChangeText={(value) => {
                  setAddress(value);
                  setAddressChanged(true);
                }}
              />
              {addressChanged && (
                <AntDesign
                  name="check"
                  size={24}
                  color="black"
                  style={{ paddingHorizontal: 10 }}
                  onPress={newAddress}
                />
              )}
            </View>
            {addressLongitude && !addressChanged && !geoError && (
              <MapRoute
                addressCoords={{
                  latitude: addressLatitude,
                  longitude: addressLongitude,
                }}
                duration={duration}
                setDuration={setDuration}
              />
            )}

            <Costs deliveryCost={calcDeliveryCost} />

            <Pressable
              style={{
                ...styles.button,
                paddingVertical: 10,
                paddingHorizontal: 20,
                marginBottom: 30,
                marginLeft: 10,
                backgroundColor:
                  fullName === "" || address === "" || addressChanged
                    ? "#ff9c9d"
                    : "#fe0002",
              }}
              disabled={
                fullName === "" || address === "" || addressChanged
                  ? true
                  : false
              }
              onPress={() => {
                addOrder({
                  uid: user.uid,
                  finishd: false,
                  fullName: fullName,
                  address: address,
                  addressGeopoint: new GeoPoint(
                    addressLatitude,
                    addressLongitude
                  ),
                  addressCoords: {
                    latitude: addressLatitude,
                    longitude: addressLongitude,
                  },
                  cart: cart,
                  cartTotalCost: getTotalCost(),
                  deliveryCost: calcDeliveryCost,
                  duration: duration,
                });
                cartReset();
                navigation.goBack();
              }}
            >
              <Text style={styles.buttonText}>Order Now</Text>
            </Pressable>
          </ScrollView>
        </>
      )}
    </View>
  );
}
