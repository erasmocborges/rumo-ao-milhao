export type ScorableQuestion = {
  numero: number;
  area: string;
  areaCurta: string;
  correta: string;
};

export type AreaSimulationScore = {
  area: string;
  short: string;
  total: number;
  correct: number;
  answered: number;
  blank: number;
  percentage: number;
};

export function calculateSimulationScore<T extends ScorableQuestion>(items: readonly T[], answers: Record<number, string>) {
  const byArea = new Map<string, AreaSimulationScore>();
  let answered = 0;
  let correct = 0;

  items.forEach((item) => {
    const saved = byArea.get(item.area) || { area: item.area, short: item.areaCurta, total: 0, correct: 0, answered: 0, blank: 0, percentage: 0 };
    const answer = answers[item.numero];

    saved.total += 1;
    if (answer) {
      answered += 1;
      saved.answered += 1;
    } else {
      saved.blank += 1;
    }
    if (answer === item.correta) {
      correct += 1;
      saved.correct += 1;
    }
    byArea.set(item.area, saved);
  });

  const areaScores = Array.from(byArea.values()).map((entry) => ({
    ...entry,
    percentage: entry.total ? Math.round((entry.correct / entry.total) * 100) : 0,
  }));

  return {
    total: items.length,
    answered,
    correct,
    percentage: items.length ? Math.round((correct / items.length) * 100) : 0,
    byArea: areaScores,
  };
}
