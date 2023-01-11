import { ListItem } from "@react-native-material/core";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import { useEffect, useState } from "react";
import { Pressable, ScrollView, Text } from "react-native";
import { db } from "../../config/firebase";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";
import LoadingEffect from "./loading";

export default function ProfileOrders({ uid, navigation }) {
  const [orders, setOrders] = useState([]);

  const ordersRef = collection(db, "orders");
  const q = query(ordersRef, where("uid", "==", uid));

  useEffect(() => {
    const handleData = (snapshot) => {
      let ordersList = [];
      snapshot.forEach((doc) => {
        const id = doc.id;
        const data = doc.data();
        ordersList.push({ ...data, id: id });
      });
      ordersList.sort((a, b) => new Date(b.date) - new Date(a.date));
      setOrders(ordersList);
    };

    const unsub = onSnapshot(q, handleData);
    return () => unsub();
  }, [db]);

  return (
    <>
      <Text style={{ textAlign: "center", fontSize: 17, fontWeight: "500" }}>
        Orders
      </Text>
      {orders ? (
        <ScrollView
          style={{
            flex: 1,
            paddingHorizontal: 10,
            marginTop: 10,
            marginBottom: 20,
          }}
        >
          {orders.map((order) => (
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
                onPress={() => {
                  navigation.navigate("OrderDetails", { id: order.id });
                }}
              />
            </Pressable>
          ))}
        </ScrollView>
      ) : (
        <LoadingEffect />
      )}
    </>
  );
}
