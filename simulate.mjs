// Learner simulation for the Hixtory adaptive engine.
// Run: node tests/simulate.mjs
import { newSkills, updateSkill, pickNext, shuffle } from "../src/adaptive.js";
import { QUESTIONS, STAGES } from "../src/data/questions.js";

const PROFILES = {
  Weak:    { 1: 0.70, 2: 0.40, 3: 0.15 },
  Average: { 1: 0.90, 2: 0.65, 3: 0.35 },
  Strong:  { 1: 0.98, 2: 0.85, 3: 0.65 },
};
const PER_STAGE = 5, PASS = 3, RUNS = 10000, MAX_ATTEMPTS = 10;

function randomPick(pool, used) {
  const left = pool.filter((q) => !used.includes(q.id));
  return left[Math.floor(Math.random() * left.length)];
}

function playGame(p, adaptive) {
  let skills = newSkills();
  const served = [], firstTry = [], attempts = [], expSucc = [];
  const skillTrace = [[], [], [], [], []]; // skill after question k, stage 1 first attempt only
  let unlocked = 1;
  for (let stage = 1; stage <= STAGES.length; stage++) {
    const topic = STAGES[stage - 1].topic;
    const pool = QUESTIONS.filter((q) => q.stage === stage);
    let tries = 0, passed = false;
    while (!passed && tries < MAX_ATTEMPTS) {
      tries++;
      const used = []; let correct = 0;
      for (let k = 0; k < PER_STAGE; k++) {
        const q = adaptive ? pickNext(pool, used, skills[topic]) : randomPick(pool, used);
        const ok = Math.random() < p[q.level];
        served.push(q.level); expSucc.push(p[q.level]);
        used.push(q.id); correct += ok;
        skills = { ...skills, [topic]: updateSkill(skills[topic], ok, false) };
        if (stage === 1 && tries === 1) skillTrace[k].push(skills[topic]);
      }
      passed = correct >= PASS;
      if (tries === 1) firstTry.push(passed);
    }
    attempts.push(tries);
  }
  return { served, firstTry, attempts, expSucc, skillTrace, finalSkills: skills };
}

const mean = (a) => a.reduce((x, y) => x + y, 0) / a.length;
const out = {};
for (const [name, p] of Object.entries(PROFILES)) {
  for (const adaptive of [true, false]) {
    const lv = [], ft = [], at = [], es = [], tr = [[], [], [], [], []], fh = [], fg = [];
    const dist = { 1: 0, 2: 0, 3: 0 }; let n = 0;
    for (let r = 0; r < RUNS; r++) {
      const g = playGame(p, adaptive);
      lv.push(mean(g.served)); es.push(mean(g.expSucc));
      ft.push(mean(g.firstTry.map(Number))); at.push(mean(g.attempts));
      g.served.forEach((l) => { dist[l]++; n++; });
      g.skillTrace.forEach((v, k) => tr[k].push(v[0]));
      fh.push(g.finalSkills.history); fg.push(g.finalSkills.geography);
    }
    out[`${name} | ${adaptive ? "adaptive" : "random"}`] = {
      meanLevel: +mean(lv).toFixed(2),
      pctEasy: +(100 * dist[1] / n).toFixed(1), pctMed: +(100 * dist[2] / n).toFixed(1), pctHard: +(100 * dist[3] / n).toFixed(1),
      expectedSuccessPct: +(100 * mean(es)).toFixed(1),
      firstAttemptPassPct: +(100 * mean(ft)).toFixed(1),
      meanAttemptsPerStage: +mean(at).toFixed(2),
      skillAfterQ: tr.map((v) => +mean(v).toFixed(2)),
      finalHistory: +mean(fh).toFixed(2), finalGeography: +mean(fg).toFixed(2),
    };
  }
}
console.log(JSON.stringify(out, null, 1));

// Shuffle bias check: how often does each item stay in position 0 (4 items)?
const cnt = [0, 0, 0, 0]; const T = 200000;
for (let i = 0; i < T; i++) cnt[shuffle([0, 1, 2, 3])[0]]++;
console.log("shuffle first-position share (ideal 25% each):", cnt.map((c) => +(100 * c / T).toFixed(1)));
// Invariants over many random games
let bad = 0;
for (let r = 0; r < 20000; r++) {
  let s = 2; for (let k = 0; k < 40; k++) { s = updateSkill(s, Math.random() < 0.5, Math.random() < 0.3); if (s < 1 || s > 3) bad++; }
}
console.log("skill out-of-range events:", bad);
