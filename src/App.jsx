import { useReducer } from "react";
import { STAGES, QUESTIONS } from "./data/questions";
import { newSkills, updateSkill, pickNext, shuffle } from "./adaptive";

const PER_STAGE = 5; // questions per stage
const PASS = 3; // correct answers needed to unlock the next stage
const LEVEL = ["", "Easy", "Medium", "Hard"];

const init = {
  screen: "start",
  unlocked: 1,
  stage: null,
  used: [],
  correct: 0,
  score: 0,
  skills: newSkills(),
  q: null,
  opts: [],
  hinted: false,
  picked: null,
};

function ask(s, stageId) {
  const stage = STAGES.find((x) => x.id === stageId);
  const pool = QUESTIONS.filter((q) => q.stage === stageId);
  const q = pickNext(pool, s.used, s.skills[stage.topic]);
  const opts = shuffle(q.options.map((text, i) => ({ text, ok: i === q.answer })));
  return { ...s, screen: "play", q, opts, hinted: false, picked: null };
}

function reducer(s, a) {
  switch (a.type) {
    case "map":
      return { ...s, screen: "map" };
    case "play":
      return ask({ ...s, stage: a.id, used: [], correct: 0 }, a.id);
    case "hint":
      return { ...s, hinted: true };
    case "answer": {
      const ok = s.opts[a.i].ok;
      const topic = STAGES.find((x) => x.id === s.stage).topic;
      const points = ok ? (s.q.level * 10) / (s.hinted ? 2 : 1) : 0;
      return {
        ...s,
        picked: a.i,
        correct: s.correct + Number(ok),
        score: s.score + points,
        used: [...s.used, s.q.id],
        skills: { ...s.skills, [topic]: updateSkill(s.skills[topic], ok, s.hinted) },
      };
    }
    case "next":
      if (s.used.length < PER_STAGE) return ask(s, s.stage);
      return {
        ...s,
        screen: "result",
        unlocked: s.correct >= PASS ? Math.max(s.unlocked, s.stage + 1) : s.unlocked,
      };
    default:
      return s;
  }
}

export default function App() {
  const [s, d] = useReducer(reducer, init);
  const stage = STAGES.find((x) => x.id === s.stage);
  const answered = s.picked !== null;

  if (s.screen === "start") {
    return (
      <main className="card center">
        <h1>Hixtory</h1>
        <p>Travel through the story of Mauritius. Answer questions, earn points and unlock new stages.</p>
        <button className="btn" onClick={() => d({ type: "map" })}>Start playing</button>
      </main>
    );
  }

  if (s.screen === "map") {
    return (
      <main className="card">
        <header className="bar">
          <h2>Choose a stage</h2>
          <span className="pts">{s.score} points</span>
        </header>
        {STAGES.map((st) => (
          <button key={st.id} className="stage" style={{ "--c": st.color }}
            disabled={st.id > s.unlocked} onClick={() => d({ type: "play", id: st.id })}>
            <span className="chip">{st.id}</span>
            <b>{st.name}</b>
            {st.id > s.unlocked && <small>Locked</small>}
          </button>
        ))}
        <p className="note">
          Your level adapts as you play. History: {LEVEL[Math.round(s.skills.history)]}.
          Geography: {LEVEL[Math.round(s.skills.geography)]}.
        </p>
        {s.unlocked > STAGES.length && <p className="win">You finished every stage. Well done!</p>}
      </main>
    );
  }

  if (s.screen === "result") {
    const passed = s.correct >= PASS;
    return (
      <main className="card center">
        <h2>{passed ? "Stage complete!" : "Nearly there, try again!"}</h2>
        <p>You got {s.correct} out of {PER_STAGE} right. You need {PASS} to unlock the next stage.</p>
        <p className="pts">{s.score} points</p>
        <div><button className="btn" onClick={() => d({ type: "map" })}>Back to the stages</button></div>
      </main>
    );
  }

  // Hint: hide two wrong answers.
  const wrong = s.opts.map((o, i) => i).filter((i) => !s.opts[i].ok);
  const hidden = s.hinted ? wrong.slice(0, 2) : [];
  const n = s.used.length + (answered ? 0 : 1);

  return (
    <main className="card" style={{ "--c": stage.color }}>
      <header className="bar">
        <span>{stage.name}</span>
        <span className="pts">{s.score} points</span>
      </header>
      <p className="note">Question {n} of {PER_STAGE}. Difficulty: {LEVEL[s.q.level]}</p>
      <h2>{s.q.q}</h2>
      {s.opts.map((o, i) =>
        hidden.includes(i) ? null : (
          <button key={i} disabled={answered} onClick={() => d({ type: "answer", i })}
            className={"opt" + (answered ? (o.ok ? " right" : i === s.picked ? " wrong" : "") : "")}>
            {o.text}
          </button>
        )
      )}
      {!answered && !s.hinted && (
        <button className="link" onClick={() => d({ type: "hint" })}>Use a hint (half points)</button>
      )}
      {answered && (
        <div className="feedback">
          <p><b>{s.opts[s.picked].ok ? "Correct!" : "Not quite."}</b> {s.q.why}</p>
          <button className="btn" onClick={() => d({ type: "next" })}>
            {s.used.length >= PER_STAGE ? "See my result" : "Next question"}
          </button>
        </div>
      )}
    </main>
  );
}
