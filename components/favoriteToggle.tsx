import { useFavorites } from "@/contexts/favoritesContext";
import type { Meal } from "@/models/meal";
import { Ionicons } from "@expo/vector-icons";
import { Pressable } from "react-native";

export default function FavoriteToggle({ meal, size = 22 }: { meal: Meal; size?: number }) {
  const { isFavorite, toggle } = useFavorites();
  const fav = isFavorite(meal.id);

  return (
    <Pressable
      onPress={(e) => {
        // prevent parent Pressable (card) from navigating
        // @ts-ignore
        e.stopPropagation?.();
        toggle(meal);
      }}
      accessibilityRole="button"
      accessibilityLabel={fav ? "Remove from favorites" : "Add to favorites"}
      style={{ padding: 6 }}
    >
      <Ionicons name={fav ? "heart" : "heart-outline"} size={size} color="#22d3ee" />
    </Pressable>
  );
}
