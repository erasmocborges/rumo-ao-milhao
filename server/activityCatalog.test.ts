import { describe, expect, it } from "vitest";
import { filterCatalog, MATH_CATEGORIES, SCHOOL_LEVELS } from "../shared/activityCatalog";

const entries = [
  { level: "1.ª série", category: "Números e Álgebra", title: "Álgebra" },
  { level: "8.º ano", category: "Geometria", title: "Geometria" },
] as const;

describe("catálogo pedagógico", () => {
  it("mantém as séries e as quatro categorias matemáticas previstas", () => {
    expect(SCHOOL_LEVELS).toContain("6.º ano");
    expect(SCHOOL_LEVELS).toContain("3.ª série");
    expect(MATH_CATEGORIES.slice(1)).toEqual(["Números e Álgebra", "Geometria", "Grandezas e Medidas", "Probabilidade e Estatística"]);
  });

  it("filtra materiais por série, categoria ou ambas", () => {
    expect(filterCatalog(entries, "Todos", "Todas")).toHaveLength(2);
    expect(filterCatalog(entries, "1.ª série", "Todas")).toEqual([entries[0]]);
    expect(filterCatalog(entries, "Todos", "Geometria")).toEqual([entries[1]]);
    expect(filterCatalog(entries, "8.º ano", "Números e Álgebra")).toEqual([]);
  });
});
