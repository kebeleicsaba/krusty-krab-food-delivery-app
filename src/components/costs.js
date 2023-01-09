import { Text, View } from "react-native";
import useCart from "../hooks/useCart";

function CostItem({ item }) {
  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "flex-end",
        paddingVertical: 2,
      }}
    >
      <Text>{item.name}</Text>
      <Text style={{ minWidth: 50, textAlign: "right" }}>
        {item.quantity && item.quantity + "x"}
      </Text>
      <Text style={{ minWidth: 60, textAlign: "right" }}>
        {item.quantity ? item.price * item.quantity : item.price} $
      </Text>
    </View>
  );
}

export default function Costs({ deliveryCost }) {
  const { cart, getTotalCost } = useCart();

  return (
    <View style={{ paddingTop: 10, paddingBottom: 20 }}>
      <View
        style={{
          borderBottomWidth: 2,
          alignItems: "flex-end",
          marginHorizontal: 20,
          paddingBottom: 3,
          marginBottom: 3,
        }}
      >
        <Text style={{ fontSize: 18, fontWeight: "500" }}>Costs</Text>
      </View>
      <View style={{ marginHorizontal: 20, alignItems: "flex-end" }}>
        {cart.map((item) => (
          <CostItem item={item} key={item.name} />
        ))}
        <CostItem item={{ name: "Delivery Cost", price: deliveryCost }} />
        <View
          style={{
            flexDirection: "row",
            justifyContent: "flex-end",
            marginTop: 5,
          }}
        >
          <Text style={{ fontSize: 18, fontWeight: "500", minWidth: 80 }}>
            Total:
          </Text>
          <Text
            style={{
              fontSize: 18,
              fontWeight: "500",
              minWidth: 30,
              textAlign: "right",
            }}
          >
            {getTotalCost() + deliveryCost} $
          </Text>
        </View>
      </View>
    </View>
  );
}
