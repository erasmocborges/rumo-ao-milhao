export const CADERNO_PRINT_QUESTIONS_PER_PAGE = 4;

export function paginateCadernoForPrint<T>(items: readonly T[], itemsPerPage = CADERNO_PRINT_QUESTIONS_PER_PAGE): T[][] {
  if (!Number.isInteger(itemsPerPage) || itemsPerPage < 1) {
    throw new Error("A paginação do caderno requer ao menos uma questão por página.");
  }

  const pages: T[][] = [];
  for (let index = 0; index < items.length; index += itemsPerPage) {
    pages.push([...items.slice(index, index + itemsPerPage)]);
  }
  return pages;
}

export function cadernoPdfFilename(date = new Date()): string {
  const stamp = [date.getFullYear(), String(date.getMonth() + 1).padStart(2, "0"), String(date.getDate()).padStart(2, "0")].join("-");
  return `simulado-enem-caderno-${stamp}.pdf`;
}
