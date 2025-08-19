import type { Meal } from "@/models/meal";

const BASE = "https://www.themealdb.com/api/json/v1/1";

function mapToMeal(dto: any): Meal {
  const ingredients = [];
  for (let i = 1; i <= 20; i++) {
    const name = dto[`strIngredient${i}`]?.trim?.();
    const measure = dto[`strMeasure${i}`]?.trim?.();
    if (name) ingredients.push({ name, measure: measure || null });
  }
  return {
    id: dto.idMeal,
    name: dto.strMeal,
    category: dto.strCategory,
    area: dto.strArea,
    instructions: dto.strInstructions,
    thumbnail: dto.strMealThumb,
    ingredients,
    imgSrcUrl: dto.strSource,
    youtubeUrl: dto.strYoutube,
  };
}

export async function getRandomMeal(): Promise<Meal> {
  const res = await fetch(`${BASE}/random.php`);
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  const json = await res.json();
  const dto = json?.meals?.[0];
  if (!dto) throw new Error("No meal returned");
  return mapToMeal(dto);
}
