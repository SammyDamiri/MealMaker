import { FavoritesProvider } from "@/contexts/favoritesContext";
import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <FavoritesProvider>
      <Stack
        screenOptions={{
          headerTitleAlign: "center",
          headerStyle: { backgroundColor: "#111827" },
          headerTintColor: "#22d3ee",
          contentStyle: { backgroundColor: "#25292e" },
        }}
      >
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="meal/[id]" options={{ title: "Details" }} />
        <Stack.Screen name="+not-found" />
      </Stack>
    </FavoritesProvider>
  );
}
