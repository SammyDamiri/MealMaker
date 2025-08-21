import { Ionicons } from "@expo/vector-icons";
import { Tabs } from "expo-router";

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        headerTitleAlign: "center",
        headerStyle: { backgroundColor: "#111827" },
        headerTintColor: "#22d3ee",
        tabBarActiveTintColor: "#22d3ee",
        tabBarInactiveTintColor: "gray",
        tabBarStyle: { backgroundColor: "#111827" },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          headerTitle: "Meal Maker",
          headerLeft: () => <></>,
          tabBarLabel: "Home",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="restaurant" color={color} size={size} />
          ),
        }}
      />
      <Tabs.Screen
        name="search"
        options={{
          headerTitle: "Search for meal",
          tabBarLabel: "Search",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="search" color={color} size={size} />
          ),
        }}
      />
      <Tabs.Screen
        name="favorites"
        options={{
          headerTitle: "Favorite Meals",
          tabBarLabel: "Favorites",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="heart" color={color} size={size} />
          ),
        }}
      />
    </Tabs>
  );
}
