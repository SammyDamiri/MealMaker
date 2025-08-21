import type { Meal } from "@/models/meal";
import AsyncStorage from "@react-native-async-storage/async-storage";

const KEY = "@favorites/v1";

export async function loadFavorites(): Promise<Meal[]> {
  const raw = await AsyncStorage.getItem(KEY);
  if (!raw) return [];
  try {
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch { return []; }
}

export async function saveFavorites(list: Meal[]) {
  await AsyncStorage.setItem(KEY, JSON.stringify(list));
}
