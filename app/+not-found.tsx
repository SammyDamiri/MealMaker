import { Stack, useRouter } from "expo-router";
import { Pressable, StyleSheet, Text, View } from "react-native";

export default function NotFoundScreen() {
  const router = useRouter();

  return (
    <>
      <Stack.Screen options={{ title: "Page not found." }} />
      <View style={styles.container}>
        <Text style={styles.text}>The page was not found!!</Text>
        <Text style={styles.text}>Press button to return to Home page.</Text>
        <Pressable
          onPress={() => router.replace("/")}
          style={[styles.btn, { marginTop: 16 }]}
        >
          <Text style={styles.btnText}>Go to home</Text>
        </Pressable>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#25292e",
  },
  text: {
    color: "white",
    fontSize: 16,
    marginBottom: 12,
  },
  btn: {
    backgroundColor: "#22d3ee",
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 8,
  },
  btnText: { color: "#0f172a", fontWeight: "700" },
});
