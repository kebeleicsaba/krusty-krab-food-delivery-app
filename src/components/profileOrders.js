import { ListItem } from "@react-native-material/core";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import { useEffect, useState } from "react";
import { Pressable, ScrollView, Text } from "react-native";
import { db } from "../../config/firebase";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";

export default function ProfileOrders({ uid, navigation }) {
  const [orders, setOrders] = useState([]);
  const [loaded, setLoaded] = useState(false);

  const ordersRef = collection(db, "orders");
  const q = query(ordersRef, where("uid", "==", uid));

  useEffect(() => {
    const handleData = (snapshot) => {
      if (!loaded) {
        snapshot.forEach((doc) => {
          const id = doc.id
          const data = doc.data();
          setOrders((prevState) => [...prevState, { ...data, id: id }]);
        });
        setLoaded(!loaded);
      }
    };

    const unsub = onSnapshot(q, handleData);
    return () => unsub();
  }, [db]);

  return (
    <ScrollView style={{ flex: 1, paddingHorizontal: 10 }}>
      <Text style={{ textAlign: "center", fontSize: 17, fontWeight: "500" }}>
        Orders
      </Text>
      {loaded &&
        orders.map((order) => (
          <Pressable key={order.id}>
            <ListItem
              leadingMode="avatar"
              title={
                new Date(order.date).toDateString() +
                ", " +
                new Date(order.date).toLocaleTimeString()
              }
              secondaryText={order.route.address}
              trailing={(props) => <Icon name="chevron-right" {...props} />}
              onPress={() => {navigation.navigate("OrderDetails", { id: order.id })}}
            />
          </Pressable>
        ))}
    </ScrollView>
  );
}
