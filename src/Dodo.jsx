// The Dodo is Hixtory's guide. It is drawn as SVG (not a photo), and its
// "chat" is a scripted dialogue bank that reacts to what is happening in
// the game — chosen at random from lines that fit the moment, so it never
// repeats the same line twice in a row. This is NOT a live AI model: doing
// that safely needs a backend to hold an API key, which is a good next step
// but out of scope for a static front-end app (see the README).

const LINES = {
  greet: [
    "Kwek! I'm Dodo, your guide through the story of Mauritius!",
    "Welcome, explorer! Ready to travel through time and across the island?",
  ],
  mapIntro: [
    "Pick a stage, and I'll walk with you the whole way!",
    "Every stage teaches you something new. Where shall we go?",
  ],
  askHistory: (level) => [
    `Hmm, this one's about our island's story. Think ${level === 3 ? "carefully" : "back"} to what you've learned!`,
    "History question! Picture the timeline in your head — what came before, what came after?",
  ],
  askGeography: (level) => [
    "A geography question — imagine you're looking down at the map of Mauritius!",
    `Where on the island would this be? ${level === 3 ? "This one's tricky, take your time." : "You've got this!"}`,
  ],
  hint: [
    "Kwek kwek! Let me cross out a couple of wrong answers for you...",
    "Here, I'll help narrow it down — two of these can't be right.",
  ],
  correct: [
    "Kwek-kwek! That's exactly right!",
    "You got it! I knew you would.",
    "Excellent! Onward!",
  ],
  correctHinted: [
    "Right answer — nice work using my hint wisely!",
    "There you go! Teamwork.",
  ],
  wrong: [
    "Not quite! Read my note below, we'll remember it next time.",
    "Oops! No worries, that's how we learn.",
    "Almost! Here's what actually happened...",
  ],
  stagePass: [
    "Kwek-KWEK! You've unlocked the next stage!",
    "Wonderful! The next part of our journey is open!",
  ],
  stageFail: [
    "So close! Your points for this stage don't count yet — let's try it again.",
    "Not this time, but nothing is lost except this stage's points. Have another go!",
  ],
  win: [
    "You've travelled the whole island with me. I'm so proud, kwek!",
  ],
};

let last = "";
function pick(list) {
  const options = list.length > 1 ? list.filter((l) => l !== last) : list;
  const choice = options[Math.floor(Math.random() * options.length)];
  last = choice;
  return choice;
}

export function dodoSay(key, arg) {
  const entry = LINES[key];
  const list = typeof entry === "function" ? entry(arg) : entry;
  return pick(list);
}

export function Dodo({ mood = "idle", speech }) {
  return (
    <div className={"dodo-wrap mood-" + mood}>
      <svg className="dodo-svg" viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <ellipse cx="60" cy="80" rx="34" ry="26" fill="#8a6a4f" />
        <ellipse cx="60" cy="80" rx="34" ry="26" fill="url(#feather)" opacity="0.5" />
        <circle cx="66" cy="46" r="22" fill="#8a6a4f" />
        <path d="M84 46 Q104 42 108 50 Q104 54 88 52 Z" fill="#e0b23c" />
        <circle cx="74" cy="40" r="3.2" fill="#1a1a1a" className="dodo-eye" />
        <ellipse cx="34" cy="66" rx="9" ry="14" fill="#6f563f" transform="rotate(-18 34 66)" />
        <path d="M50 100 Q56 108 62 100" stroke="#e0b23c" strokeWidth="4" fill="none" strokeLinecap="round" />
        <path d="M62 100 Q68 108 74 100" stroke="#e0b23c" strokeWidth="4" fill="none" strokeLinecap="round" />
        <path d="M40 30 Q46 18 56 24" stroke="#5c4632" strokeWidth="4" fill="none" strokeLinecap="round" />
        <defs>
          <radialGradient id="feather" cx="40%" cy="30%">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.5" />
            <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
          </radialGradient>
        </defs>
      </svg>
      {speech && (
        <div className="speech-bubble" role="status">
          {speech}
        </div>
      )}
    </div>
  );
}
