// Adaptive difficulty engine.
// Each topic has a skill estimate on the same 1-3 scale as question levels
// (1 = easy, 2 = medium, 3 = hard). It moves up when the student answers
// correctly and down when they get it wrong, and the next question is the
// unused one whose level is closest to that estimate.

export const clamp = (n, lo, hi) => Math.min(hi, Math.max(lo, n));

export const shuffle = (list) => [...list].sort(() => Math.random() - 0.5);

export const newSkills = () => ({ history: 2, geography: 2 });

export function updateSkill(skill, correct, usedHint) {
  const step = correct ? (usedHint ? 0.15 : 0.35) : -0.5;
  return clamp(skill + step, 1, 3);
}

export function pickNext(pool, usedIds, skill) {
  let best = null;
  let bestGap = Infinity;
  for (const q of shuffle(pool.filter((q) => !usedIds.includes(q.id)))) {
    const gap = Math.abs(q.level - skill);
    if (gap < bestGap) {
      best = q;
      bestGap = gap;
    }
  }
  return best;
}
