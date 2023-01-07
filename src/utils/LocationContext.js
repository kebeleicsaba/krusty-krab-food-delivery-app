import { createContext, useState, useEffect } from "react";
import * as Location from "expo-location";

export const LocationContext = createContext();

const LocationProvider = (props) => {
  const [location, setLocation] = useState(false);

  useEffect(() => {
    const getLoc = async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      console.log(status);
      if (status === "granted") {
        const location = await Location.getCurrentPositionAsync();
        setLocation(location);
      }
    };
    getLoc();
  }, [location]);

  return <LocationContext.Provider value={{ location }} {...props} />;
};

export default LocationProvider;
