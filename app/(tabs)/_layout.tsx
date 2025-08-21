import { Tabs } from "expo-router";

export default function TabsLayout() {
  return (
    <Tabs screenOptions={{ headerTitleAlign: "center" }}>
      <Tabs.Screen
        name="index"
        options={{
          headerTitle: "Meal Maker",
          headerLeft: () => <></>,
        }}
      />
      <Tabs.Screen
        name="search"
        options={{
          headerTitle: "Search for meal",
        }}
      />
    </Tabs>
  );
}
