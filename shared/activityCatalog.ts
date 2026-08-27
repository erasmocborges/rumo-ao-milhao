export const SCHOOL_LEVELS = ["Todos", "6.º ano", "7.º ano", "8.º ano", "9.º ano", "1.ª série", "2.ª série", "3.ª série"] as const;
export const MATH_CATEGORIES = ["Todas", "Números e Álgebra", "Geometria", "Grandezas e Medidas", "Probabilidade e Estatística"] as const;

type CatalogFilterable = { level: string; category: string };

export function filterCatalog<T extends CatalogFilterable>(items: readonly T[], level: string, category: string): T[] {
  return items.filter((item) => (level === "Todos" || item.level === level) && (category === "Todas" || item.category === category));
}
