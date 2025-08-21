import type { Meal } from "@/models/meal";
import { loadFavorites, saveFavorites } from "@/repositories/favoritesRepo";
import { createContext, useContext, useEffect, useMemo, useState } from "react";

type Ctx = {
  favorites: Meal[];
  add: (m: Meal) => void;
  remove: (id: string) => void;
  toggle: (m: Meal) => void;
  isFavorite: (id: string) => boolean;
};

const FavoritesContext = createContext<Ctx | undefined>(undefined);

export function FavoritesProvider({ children }: { children: React.ReactNode }) {
  const [favorites, setFavorites] = useState<Meal[]>([]);

  useEffect(() => { (async () => setFavorites(await loadFavorites()))(); }, []);
  useEffect(() => { saveFavorites(favorites); }, [favorites]);

  const add = (m: Meal) =>
    setFavorites((prev) => (prev.some(x => x.id === m.id) ? prev : [m, ...prev]));
  const remove = (id: string) =>
    setFavorites((prev) => prev.filter(x => x.id !== id));
  const toggle = (m: Meal) =>
    setFavorites((prev) => (prev.some(x => x.id === m.id) ? prev.filter(x => x.id !== m.id) : [m, ...prev]));
  const isFavorite = (id: string) => favorites.some(x => x.id === id);

  const value = useMemo(() => ({ favorites, add, remove, toggle, isFavorite }), [favorites]);
  return <FavoritesContext.Provider value={value}>{children}</FavoritesContext.Provider>;
}

export function useFavorites() {
  const ctx = useContext(FavoritesContext);
  if (!ctx) throw new Error("useFavorites must be used within FavoritesProvider");
  return ctx;
}
