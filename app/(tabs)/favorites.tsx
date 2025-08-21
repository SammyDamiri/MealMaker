import MealListCard from "@/components/mealListCard";
import { useFavorites } from "@/contexts/favoritesContext";
import { FlatList, StyleSheet, Text, View } from "react-native";

export default function FavoritesScreen() {
  const { favorites } = useFavorites();

  return (
    <View style={styles.container}>
      <Text style={styles.screenTitle}>Favorites</Text>

      {favorites.length === 0 ? (
        <Text style={styles.empty}>
          No favorites yet. Tap the ❤️ on any recipe.
        </Text>
      ) : null}

      <FlatList
        data={favorites}
        keyExtractor={(m) => m.id}
        renderItem={({ item }) => <MealListCard meal={item} />}
        contentContainerStyle={{ paddingVertical: 12 }}
        ItemSeparatorComponent={() => <View style={{ height: 4 }} />}
        keyboardShouldPersistTaps="handled"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#25292e", paddingTop: 12 },
  screenTitle: {
    color: "white",
    fontSize: 22,
    fontWeight: "800",
    alignSelf: "center",
    marginHorizontal: 12,
    marginBottom: 8,
  },
  empty: { color: "#cbd5e1", alignSelf: "center", marginHorizontal: 12, marginTop: 8 },
});
