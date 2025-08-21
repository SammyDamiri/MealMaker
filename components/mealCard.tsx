// components/mealCard.tsx
import { useFavorites } from "@/contexts/favoritesContext";
import type { Meal } from "@/models/meal";
import { Ionicons } from "@expo/vector-icons";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";

type Props = {
  meal: Meal;
  /** Set false if you ever want to hide the heart on a specific screen */
  showFavorite?: boolean;
};

export default function MealCard({ meal, showFavorite = true }: Props) {
  const { isFavorite, toggle } = useFavorites();
  const fav = isFavorite(meal.id);

  const ingredients = meal.ingredients.filter((i) => i.name).slice(0, 20);

  return (
    <View style={styles.card} accessible accessibilityLabel={`${meal.name} recipe card`}>
      {/* Row 1: Title + Heart */}
      <View style={styles.headerRow}>
        <Text style={styles.title} accessibilityRole="header" numberOfLines={2}>
          {meal.name}
        </Text>
        {showFavorite && (
          <Pressable
            onPress={() => toggle(meal)}
            accessibilityRole="button"
            accessibilityLabel={fav ? "Remove from favorites" : "Add to favorites"}
            style={styles.heartBtn}
            hitSlop={6}
          >
            <Ionicons name={fav ? "heart" : "heart-outline"} size={22} color="#22d3ee" />
          </Pressable>
        )}
      </View>

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
          {ingredients.map((ing) => {
            const key = `${ing.name}-${ing.measure ?? ""}`;
            return (
              <Text key={key} style={styles.ingItem}>
                • {ing.name}
                {ing.measure ? ` (${ing.measure})` : ""}
              </Text>
            );
          })}
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

  // Title row
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  title: {
    color: "white",
    fontSize: 22,
    fontWeight: "800",
    flex: 1,
  },
  heartBtn: { padding: 4 },

  // Image
  thumb: {
    width: "100%",
    height: undefined,
    aspectRatio: 4 / 3,
    backgroundColor: "#0f172a",
    borderRadius: 10,
  },

  // Sections
  section: { gap: 6 },
  sectionTitle: {
    color: "#cbd5e1",
    fontWeight: "700",
    fontSize: 14,
    letterSpacing: 0.3,
    textTransform: "uppercase",
  },

  // Ingredients list
  ingList: { gap: 4 },
  ingItem: { color: "#e5e7eb", fontSize: 14, lineHeight: 20 },

  // Instructions
  instructions: { color: "#e5e7eb", fontSize: 14, lineHeight: 20 },
});
