import { StyleSheet } from "react-native";

export default styles = StyleSheet.create({
  input: {
    height: 40,
    marginBottom: 12,
    marginTop: 3,
    borderWidth: 1,
    borderRadius: 6,
  },
  container: {
    backgroundColor: "white",
    flex: 1,
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
    padding: 0,
    fontWeight: "bold",
    minWidth: 30,
    textAlign: "center",
  },
});
