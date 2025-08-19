export type Ingredient = {
  name: string;
  measure?: string | null;
};

export type Meal = {
  id: string;
  name: string;
  category?: string | null;
  area?: string | null;
  instructions?: string | null;
  thumbnail?: string | null;
  ingredients: Ingredient[];
  imgSrcUrl?: string | null;
  youtubeUrl?: string | null;
};
