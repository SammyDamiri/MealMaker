import MealListCard from "@/components/mealListCard";
import type { Meal } from "@/models/meal";
import { searchMeals } from "@/repositories/mealRepo";
import { useEffect, useMemo, useRef, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  Keyboard,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

export default function SearchScreen() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<Meal[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const debounceMs = 350;
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const acRef = useRef<AbortController | null>(null);

  useEffect(() => {
    if (timer.current) clearTimeout(timer.current);
    if (acRef.current) {
      acRef.current.abort(); // cancel previous request
      acRef.current = null;
    }

    if (query.trim().length < 2) {
      setResults([]);
      setError(null);
      setLoading(false);
      return;
    }

    timer.current = setTimeout(async () => {
      const ac = new AbortController();
      acRef.current = ac;
      try {
        setLoading(true);
        setError(null);
        const data = await searchMeals(query.trim(), ac.signal);
        setResults(data);
      } catch (e: any) {
        if (e?.name !== "AbortError") setError(e?.message ?? "Search failed");
      } finally {
        setLoading(false);
      }
    }, debounceMs);

    return () => {
      if (timer.current) clearTimeout(timer.current);
      if (acRef.current) acRef.current.abort();
    };
  }, [query]);

  const empty = useMemo(
    () => !loading && !error && query.trim().length >= 2 && results.length === 0,
    [loading, error, query, results.length]
  );

  return (
    <View style={styles.container}>
      <Text style={styles.screenTitle}>Search recipes</Text>

      <View style={styles.searchBar}>
        <TextInput
          value={query}
          onChangeText={setQuery}
          placeholder="Search for Meal..."
          placeholderTextColor="#94a3b8"
          style={styles.input}
          returnKeyType="search"
          onSubmitEditing={() => Keyboard.dismiss()}
          accessibilityLabel="Search recipes by name"
        />
        {loading ? <ActivityIndicator style={{ marginLeft: 8 }} /> : null}
      </View>

      {error ? <Text style={styles.err}>{error}</Text> : null}
      {empty ? <Text style={styles.empty}>No recipes found.</Text> : null}

      <FlatList
        data={results}
        keyExtractor={(m) => m.id}
        renderItem={({ item }) => <MealListCard meal={item} />}
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={{ paddingVertical: 12 }}
        ItemSeparatorComponent={() => <View style={{ height: 4 }} />}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#25292e",
    paddingTop: 12,
  },
  screenTitle: {
    color: "white",
    fontSize: 22,
    fontWeight: "800",
    marginHorizontal: 12,
    marginBottom: 8,
  },
  searchBar: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#0f172a",
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 8,
    marginHorizontal: 12,
    gap: 8,
  },
  input: {
    flex: 1,
    color: "white",
    fontSize: 16,
    paddingVertical: 6,
  },
  err: { color: "#fecaca", marginTop: 8, marginHorizontal: 12 },
  empty: { color: "#cbd5e1", marginTop: 12, marginHorizontal: 12 },
});
