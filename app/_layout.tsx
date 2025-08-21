import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack
      screenOptions={{
        statusBarStyle: "light",
        headerTitleAlign: "center",
        headerStyle: { backgroundColor: "#111827" },
        headerTintColor: "#22d3ee",
      }}
    >
      <Stack.Screen
        name="(tabs)"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen name="+not-found" options={{}} />
    </Stack>
  );
}
