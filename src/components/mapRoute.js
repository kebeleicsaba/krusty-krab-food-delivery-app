import { useState } from "react";
import { Dimensions, Image, Text, View } from "react-native";
import MapView from "react-native-maps";
import { Marker } from "react-native-maps";
import MapViewDirections from "react-native-maps-directions";
import Constants from "expo-constants";

const { config } = Constants.manifest.extra;
const krustyKrabCoords = {
  latitude: 47.68006,
  longitude: 16.57868,
};

export default function MapRoute({ addressCoords }) {
  const [duration, setDuration] = useState();
  const getDuration = (result) => {
    if (result) {
      setDuration(result.duration);
    }
  };

  return (
    <>
      <Text>{JSON.stringify(addressCoords)}</Text>
      <MapView
        initialRegion={{
          latitude: addressCoords.latitude,
          longitude: addressCoords.longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
        style={{
          width: Dimensions.get("window").width - 40,
          height: Dimensions.get("window").width - 40,
          alignSelf: "center",
        }}
      >
        <MapViewDirections
          origin={krustyKrabCoords}
          destination={addressCoords}
          apikey={config.googleMapsApiKey} // insert your API Key here
          strokeWidth={4}
          strokeColor="#FE0002"
          onReady={getDuration}
        />

        <Marker
          coordinate={{
            latitude: krustyKrabCoords.latitude,
            longitude: krustyKrabCoords.longitude,
          }}
        >
          <Image
            source={require("../images/krusty_krab_marker.png")}
            style={{ height: 40, resizeMode: "contain" }}
          />
        </Marker>
        <Marker
          coordinate={{
            latitude: addressCoords.latitude,
            longitude: addressCoords.longitude,
          }}
        >
          <View style={{ alignItems: "center" }}>
            <Image
              source={require("../images/home_marker.png")}
              style={{ height: 40, resizeMode: "contain", flex: 1 }}
            />
            <Text style={{ color: "white", fontSize: 10 }}>Your Address</Text>
          </View>
        </Marker>
      </MapView>
      <Text style={{ textAlign: "center" }}>
        Duration: {Math.ceil(duration)} minutes.
      </Text>
    </>
  );
}