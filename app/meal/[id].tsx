import MealCard from "@/components/mealCard";
import type { Meal } from "@/models/meal";
import { getMealById } from "@/repositories/mealRepo";
import { Stack, useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";

export default function MealDetail() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const [meal, setMeal] = useState<Meal | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const ac = new AbortController();
    (async () => {
      try {
        setError(null);
        setLoading(true);
        if (id) setMeal(await getMealById(id, ac.signal));
      } catch (e: any) {
        if (e?.name !== "AbortError")
          setError(e.message ?? "Failed to load meal");
      } finally {
        setLoading(false);
      }
    })();
    return () => ac.abort();
  }, [id]);

  if (loading)
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" />
      </View>
    );
  if (error)
    return (
      <View style={styles.center}>
        <Text style={{ color: "red" }}>{error}</Text>
      </View>
    );
  if (!meal)
    return (
      <View style={styles.center}>
        <Text style={{ color: "white" }}>No meal found</Text>
      </View>
    );

  return (
    <>
      <Stack.Screen options={{ title: meal?.name ?? "Details" }} />
      {loading ? (
        <View style={styles.center}>
          <ActivityIndicator size="large" />
        </View>
      ) : error ? (
        <View style={styles.center}>
          <Text style={{ color: "red" }}>{error}</Text>
        </View>
      ) : meal ? (
        <ScrollView
          style={{ backgroundColor: "#25292e" }}
          contentContainerStyle={{ paddingVertical: 20 }}
        >
          <MealCard meal={meal} />
        </ScrollView>
      ) : (
        <View style={styles.center}>
          <Text style={{ color: "white" }}>No meal found</Text>
        </View>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#25292e",
  },
});
