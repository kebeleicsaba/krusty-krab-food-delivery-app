import { doc, getDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { ScrollView, Text, View } from "react-native";
import { db } from "../../../config/firebase";
import MapRoute from "../../components/mapRoute";
import Costs from "../../components/costs";

export default function OrderDetailsScreen({ route }) {
  const [order, setOrder] = useState();

  useEffect(() => {
    const getData = async () => {
      const docRef = doc(db, "orders", route.params.id);
      const docSnap = await getDoc(docRef);
      setOrder(docSnap.data());
    };
    getData();
  }, [db]);

  return (
    <ScrollView style={styles.container}>
      {order && (
        <>
          <Text>
            {new Date(order.date).toDateString() +
              ", " +
              new Date(order.date).toLocaleTimeString()}
          </Text>
          <Text>Name: {order.fullName}</Text>
          <Text>Address:</Text>
          <View>
            <MapRoute
              krustyKrabCoords={order.route.krustyKrabCoords}
              addressCoords={order.route.addressCoords}
              duration={order.route.duration}
            />
          </View>
          <Costs
            deliveryCost={order.route.deliveryCost}
            cart={order.cart}
            getTotalCost={() => order.cartTotalCost}
          />
        </>
      )}
    </ScrollView>
  );
}
