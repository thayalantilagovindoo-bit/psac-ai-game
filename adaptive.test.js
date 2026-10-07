import { test } from "node:test";
import assert from "node:assert/strict";
import { clamp, newSkills, updateSkill, pickNext, shuffle } from "../src/adaptive.js";
import { QUESTIONS, STAGES } from "../src/data/questions.js";

const approx = (a, b) => assert.ok(Math.abs(a - b) < 1e-9, `${a} !== ${b}`);

test("every player starts at medium (2) for both subjects", () => {
  assert.deepEqual(newSkills(), { history: 2, geography: 2 });
});

test("correct answer raises skill by 0.35", () => approx(updateSkill(2, true, false), 2.35));
test("correct answer with hint raises skill by 0.15", () => approx(updateSkill(2, true, true), 2.15));
test("wrong answer lowers skill by 0.5", () => approx(updateSkill(2, false, false), 1.5));
test("wrong answer with hint also lowers skill by 0.5", () => approx(updateSkill(2, false, true), 1.5));

test("skill never goes above 3 or below 1", () => {
  let s = 3;
  for (let i = 0; i < 20; i++) s = updateSkill(s, true, false);
  assert.equal(s, 3);
  s = 1;
  for (let i = 0; i < 20; i++) s = updateSkill(s, false, false);
  assert.equal(s, 1);
});

test("clamp keeps values inside the range", () => {
  assert.equal(clamp(5, 1, 3), 3);
  assert.equal(clamp(-1, 1, 3), 1);
  assert.equal(clamp(2, 1, 3), 2);
});

test("pickNext chooses the level closest to the skill", () => {
  const pool = QUESTIONS.filter((q) => q.stage === 1);
  for (let i = 0; i < 50; i++) {
    assert.equal(pickNext(pool, [], 1).level, 1);
    assert.equal(pickNext(pool, [], 3).level, 3);
    assert.equal(pickNext(pool, [], 2).level, 2);
  }
});

test("pickNext never returns a question that was already used", () => {
  const pool = QUESTIONS.filter((q) => q.stage === 2);
  const used = [];
  for (let i = 0; i < pool.length; i++) {
    const q = pickNext(pool, used, 2);
    assert.ok(!used.includes(q.id));
    used.push(q.id);
  }
  assert.equal(new Set(used).size, pool.length);
});

test("pickNext falls back to the only question left", () => {
  const pool = QUESTIONS.filter((q) => q.stage === 3);
  const used = pool.slice(1).map((q) => q.id);
  assert.equal(pickNext(pool, used, 3).id, pool[0].id);
});

test("pickNext returns null when no questions remain", () => {
  const pool = QUESTIONS.filter((q) => q.stage === 3);
  assert.equal(pickNext(pool, pool.map((q) => q.id), 2), null);
});

test("shuffle keeps all items and does not change the input", () => {
  const a = [1, 2, 3, 4, 5];
  const b = shuffle(a);
  assert.deepEqual([...b].sort(), a);
  assert.deepEqual(a, [1, 2, 3, 4, 5]);
});

test("question bank is well formed", () => {
  const ids = new Set();
  for (const q of QUESTIONS) {
    assert.ok(!ids.has(q.id)); ids.add(q.id);
    assert.ok(STAGES.some((s) => s.id === q.stage));
    assert.ok([1, 2, 3].includes(q.level));
    assert.equal(q.options.length, 4);
    assert.ok(q.answer >= 0 && q.answer < q.options.length);
    assert.ok(q.why.length > 0);
  }
});

test("every stage has at least two questions at each level", () => {
  for (const s of STAGES) for (const l of [1, 2, 3]) {
    const n = QUESTIONS.filter((q) => q.stage === s.id && q.level === l).length;
    assert.ok(n >= 2, `stage ${s.id} level ${l} has ${n}`);
  }
});
