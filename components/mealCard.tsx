import type { Meal } from "@/models/meal";
import { Image, StyleSheet, Text, View } from "react-native";

export default function MealCard({ meal }: { meal: Meal }) {
  const top = meal.ingredients.slice(0, 6);
  return (
    <View style={s.card}>
      {meal.thumbnail ? (
        <Image source={{ uri: meal.thumbnail }} style={s.thumb} />
      ) : null}
      <View style={s.body}>
        <Text style={s.title}>{meal.name}</Text>
        <Text style={s.meta}>
          {[meal.category, meal.area].filter(Boolean).join(" · ")}
        </Text>
        {top.map((x, i) => (
          <Text key={i} style={s.ing}>
            • {x.name}
            {x.measure ? ` (${x.measure})` : ""}
          </Text>
        ))}
      </View>
    </View>
  );
}

const s = StyleSheet.create({
  card: {
    width: "90%",
    flexDirection: "row",        // 👈 side-by-side layout
    borderRadius: 12,
    overflow: "hidden",
    backgroundColor: "#111827",
  },
  thumb: {
    width: 120,                  // 👈 fixed width for left column
    height: "100%",              // 👈 fill the card height
    backgroundColor: "#0f172a",
  },
  body: {
    flex: 1,                     // 👈 take remaining space
    padding: 12,
    gap: 6,
  },
  title: { color: "white", fontSize: 18, fontWeight: "700" },
  meta: { color: "#cbd5e1" },
  ing: { color: "#e5e7eb", fontSize: 13 },
});
