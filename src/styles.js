import { StyleSheet } from "react-native";

export default styles = StyleSheet.create({
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
  },
  container: {
    backgroundColor: "white",
    flex: 1,
  },
  errorText: {
    color: "red",
    paddingLeft: 10,
    paddingTop: 20,
  },
  button: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 6,
    elevation: 3,
    backgroundColor: "#FE0002",
    marginHorizontal: 8,
  },
  buttonText: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: "bold",
    letterSpacing: 0.25,
    color: "white",
  },
  counterText: {
    fontSize: 16,
    padding: 6,
    fontWeight: "bold",
  },
});
