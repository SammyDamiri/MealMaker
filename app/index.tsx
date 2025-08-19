import MealCard from "@/components/mealCard";
import type { Meal } from "@/models/meal";
import { getRandomMeal } from "@/repositories/mealRepo";
import { useCallback, useEffect, useState } from "react";
import { ActivityIndicator, Pressable, RefreshControl, ScrollView, StyleSheet, Text, View } from "react-native";

export default function Index() {
  const [meal, setMeal] = useState<Meal | null>(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async () => {
    try {
      setError(null); setLoading(true);
      setMeal(await getRandomMeal());
    } catch (e: any) {
      setError(e?.message ?? "Failed to fetch meal");
    } finally { setLoading(false); }
  }, []);

  const refresh = useCallback(async () => {
    try {
      setRefreshing(true);
      setMeal(await getRandomMeal());
    } finally { setRefreshing(false); }
  }, []);

  useEffect(() => { load(); }, [load]);

  if (loading) return <View style={s.center}><ActivityIndicator size="large" /></View>;
  if (error) return (
    <View style={s.center}>
      <Text style={s.err}>{error}</Text>
      <Pressable onPress={load} style={s.btn}><Text style={s.btnText}>Try again</Text></Pressable>
    </View>
  );

  return (
    <ScrollView contentContainerStyle={[s.center,{paddingVertical:24}]}
      refreshControl={<RefreshControl refreshing={refreshing} onRefresh={refresh} />}>
      {meal && <MealCard meal={meal} />}
      <Pressable onPress={refresh} style={[s.btn,{marginTop:16}]}>
        <Text style={s.btnText}>Give me another</Text>
      </Pressable>
    </ScrollView>
  );
}

const s = StyleSheet.create({
  center:{flexGrow:1,justifyContent:"center",alignItems:"center",backgroundColor:"#25292e",gap:12},
  err:{color:"#fecaca",fontSize:16},
  btn:{backgroundColor:"#22d3ee",paddingHorizontal:14,paddingVertical:10,borderRadius:8},
  btnText:{color:"#0f172a",fontWeight:"700"},
});
