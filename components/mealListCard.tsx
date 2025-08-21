import type { Meal } from "@/models/meal";
import { useRouter } from "expo-router";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";

type Props = {
  meal: Meal;
  onPress?: (meal: Meal) => void;
};

export default function MealListCard({ meal, onPress }: Props) {
  const router = useRouter();

  const handlePress = () => {
    if (onPress) {
      onPress(meal);
      return;
    }
    router.push({ pathname: "/meal/[id]" as const, params: { id: meal.id } });
  };

  return (
    <Pressable
      onPress={handlePress}
      style={styles.card}
      android_ripple={{ color: "#0ea5b5" }}
      accessibilityRole="button"
      accessibilityLabel={`${meal.name} ${meal.category ?? ""} ${
        meal.area ?? ""
      }`}
    >
      <Image
        source={meal.thumbnail ? { uri: meal.thumbnail } : undefined}
        style={styles.thumb}
        resizeMode="cover"
        accessibilityLabel={`${meal.name} thumbnail`}
      />
      <View style={{ flex: 1 }}>
        <Text style={styles.title} numberOfLines={1}>
          {meal.name}
        </Text>
        <Text style={styles.meta} numberOfLines={1}>
          {[meal.category, meal.area].filter(Boolean).join(" • ") || "—"}
        </Text>
      </View>
      <Text style={styles.chev} accessibilityElementsHidden>
        ›
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    width: "90%",
    maxWidth: 720,
    alignSelf: "center",
    alignItems: "center",
    gap: 12,
    backgroundColor: "#111827",
    borderRadius: 12,
    padding: 10,
    marginHorizontal: 12,
    marginVertical: 4,
  },
  thumb: {
    width: 64,
    height: 64,
    borderRadius: 8,
    backgroundColor: "#0f172a",
  },
  title: { color: "white", fontWeight: "700" },
  meta: { color: "#94a3b8", marginTop: 2, fontSize: 12 },
  chev: { color: "#22d3ee", fontSize: 24, paddingHorizontal: 4 },
});
