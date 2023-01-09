import { createContext, useState, useEffect } from "react";
import * as Location from "expo-location";

export const LocationContext = createContext();

const LocationProvider = (props) => {
  const [location, setLocation] = useState(false);
  const [status, setStatus] = useState();
  const [loaded, setLoaded] = useState(false);
  const [geoError, setGeoError] = useState(false);

  useEffect(() => {
    const getLoc = async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      setStatus(status);
      if (status === "granted") {
        const location = await Location.getCurrentPositionAsync();
        setLocation(location);
      }
    };
    if (loaded === false) {
      getLoc();
      setLoaded(true);
    }
  }, [loaded]);

  return (
    <LocationContext.Provider
      value={{ location, status, geoError, setGeoError }}
      {...props}
    />
  );
};

export default LocationProvider;
