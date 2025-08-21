import type { Meal } from "@/models/meal";
import { Image, StyleSheet, Text, View } from "react-native";

export default function MealCard({ meal }: { meal: Meal }) {
  const ingredients = meal.ingredients.filter((i) => i.name).slice(0, 20);

  return (
    <View style={styles.card}>
      {/* Row 1: Title */}
      <Text style={styles.title} accessibilityRole="header">
        {meal.name}
      </Text>

      {/* Row 2: Image */}
      {meal.thumbnail ? (
        <Image
          source={{ uri: meal.thumbnail }}
          style={styles.thumb}
          resizeMode="cover"
          accessibilityLabel={`${meal.name} photo`}
        />
      ) : null}

      {/* Row 3: Ingredients */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Ingredients</Text>
        <View style={styles.ingList}>
          {ingredients.map((ing, idx) => (
            <Text key={idx} style={styles.ingItem}>
              • {ing.name}
              {ing.measure ? ` (${ing.measure})` : ""}
            </Text>
          ))}
        </View>
      </View>

      {/* Row 4: Instructions */}
      {meal.instructions ? (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Instructions</Text>
          <Text style={styles.instructions}>{meal.instructions.trim()}</Text>
        </View>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    width: "90%",
    maxWidth: 720,
    borderRadius: 12,
    overflow: "hidden",
    backgroundColor: "#111827",
    padding: 14,
    gap: 12,
    alignSelf: "center",
  },

  // Row 1
  title: {
    color: "white",
    fontSize: 22,
    fontWeight: "800",
  },

  // Row 2
  thumb: {
    width: "100%",
    height: undefined,
    aspectRatio: 4 / 3,
    backgroundColor: "#0f172a",
    borderRadius: 10,
  },

  // Rows 3 & 4
  section: {
    gap: 6,
  },
  sectionTitle: {
    color: "#cbd5e1",
    fontWeight: "700",
    fontSize: 14,
    letterSpacing: 0.3,
    textTransform: "uppercase",
  },

  // Ingredients list
  ingList: {
    gap: 4,
  },
  ingItem: {
    color: "#e5e7eb",
    fontSize: 14,
    lineHeight: 20,
  },

  // Instructions
  instructions: {
    color: "#e5e7eb",
    fontSize: 14,
    lineHeight: 20,
  },
});
