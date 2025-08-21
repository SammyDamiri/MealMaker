import MealCard from "@/components/mealCard";
import type { Meal } from "@/models/meal";
import { getRandomMeal } from "@/repositories/mealRepo";
import * as Haptics from "expo-haptics";
import { Accelerometer } from "expo-sensors";
import { useCallback, useEffect, useRef, useState } from "react";
import {
  ActivityIndicator,
  Platform,
  Pressable,
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";

export default function Index() {
  const [meal, setMeal] = useState<Meal | null>(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async () => {
    try {
      setError(null);
      setLoading(true);
      setMeal(await getRandomMeal());
    } catch (e: any) {
      setError(e?.message ?? "Failed to fetch meal");
    } finally {
      setLoading(false);
    }
  }, []);

  const refresh = useCallback(async () => {
    try {
      setRefreshing(true);
      setMeal(await getRandomMeal());
    } finally {
      setRefreshing(false);
    }
  }, []);

  const lastFiredRef = useRef(0); // keep across events

  // Initial load
  useEffect(() => {
    load();
  }, [load]);

  // 🔔 Shake-to-refresh
  useEffect(() => {
    // No accel on web, and don’t bind twice
    if (Platform.OS === "web") return;

    // Sample every ~120ms (lower = more sensitive)
    Accelerometer.setUpdateInterval(120);

    let last = { x: 0, y: 0, z: 0 };
    const cooldownMs = 1200; // don’t fire repeatedly
    const threshold = 1.4; // tweak sensitivity (1.2–1.8 is typical)

    const sub = Accelerometer.addListener(({ x, y, z }) => {
      // Amount of motion since last sample
      const delta =
        Math.abs(x - last.x) + Math.abs(y - last.y) + Math.abs(z - last.z);

      if (delta > threshold) {
        const now = Date.now();
        // avoid double-fire while we're already refreshing
        if (!refreshing && now - lastFiredRef.current > cooldownMs) {
          lastFiredRef.current = now;
          // nice little bump; ignore errors if not supported
          Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium).catch(
            () => {}
          );
          refresh();
        }
      }
      last = { x, y, z };
    });

    return () => sub.remove();
  }, [refresh, refreshing]);

  if (loading)
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" />
      </View>
    );

  if (error)
    return (
      <View style={styles.center}>
        <Text style={styles.err}>{error}</Text>
        <Pressable onPress={load} style={styles.btn}>
          <Text style={styles.btnText}>Try again</Text>
        </Pressable>
      </View>
    );

  return (
    <ScrollView
      contentContainerStyle={[styles.center, { paddingVertical: 24 }]}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={refresh} />
      }
    >
      <Pressable onPress={refresh} style={styles.btn}>
        <Text style={styles.btnText}>New Meal</Text>
      </Pressable>
      {Platform.OS !== "web" && (
        <Text style={{ color: "#94a3b8" }}>
          Tip: shake device for a new meal
        </Text>
      )}
      {meal && <MealCard meal={meal} />}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  center: {
    flexGrow: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    backgroundColor: "#25292e",
    gap: 12,
  },
  err: { color: "#fecaca", fontSize: 16 },
  btn: {
    backgroundColor: "#22d3ee",
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 8,
  },
  btnText: { color: "#0f172a", fontWeight: "700" },
});
