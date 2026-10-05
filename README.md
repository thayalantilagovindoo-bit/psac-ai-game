# Hixtory

An adaptive history and geography game for Mauritian primary school pupils preparing for the **Primary School Achievement Certificate (PSAC)**.

Players travel through the story and map of Mauritius, answering questions to earn points and unlock new stages. While they play, an adaptive engine estimates their level in each subject and chooses questions that match it.

Built for the module **ICT 3133Y – Artificial Intelligence** (Assignment, Question 5).

## Features

- **Four stages**, each themed and coloured after the Mauritian flag: Dutch and French times, British rule and labour, Independence, and the Map of Mauritius.
- **Points and progression:** 10, 20 or 30 points per correct answer (easy, medium, hard). Three correct answers out of five unlock the next stage.
- **Hints:** remove two wrong answers, at the cost of half the points.
- **Instant feedback:** every answer comes with a short explanation.
- **Adaptive difficulty:** the game keeps a skill estimate for History and Geography and picks the next question to match.

## Tech stack

| Tool | Use |
|---|---|
| [React](https://react.dev) | User interface and game state (`useReducer`) |
| [Vite](https://vite.dev) | Development server and build tool |
| JavaScript (ES modules) | Game logic and adaptive engine |
| CSS | Styling, no framework |

## Getting started

### Prerequisites

- [Node.js](https://nodejs.org) 20.19 or newer (the current LTS is recommended)
- Git

Check your versions:

```bash
node -v
npm -v
```

### Install and run

```bash
git clone https://github.com/thayalantilagovindoo-bit/psac-ai-game.git
cd psac-ai-game
npm install
npm run dev
```

Open the address shown in the terminal, usually `http://localhost:5173`.

> **Windows PowerShell:** if `npm` is blocked with a message about running scripts being disabled, run `Set-ExecutionPolicy -Scope CurrentUser -ExecutionPolicy RemoteSigned` once, or use Command Prompt instead.

### Other commands

| Command | What it does |
|---|---|
| `npm run dev` | Starts the development server with live reload |
| `npm run build` | Creates an optimised production build in `dist/` |
| `npm run preview` | Serves the production build locally |
| `npm run lint` | Checks the code with ESLint |

## Project structure

```
psac-ai-game/
├── public/                 Static files
├── src/
│   ├── data/
│   │   └── questions.js    Stages and the question bank
│   ├── adaptive.js         Adaptive engine (skill update and question selection)
│   ├── App.jsx             User interface and game reducer
│   ├── index.css           Styles
│   └── main.jsx            Application entry point
├── index.html
├── package.json
└── vite.config.js
```

## How the game works

1. The player chooses an unlocked stage from the stage map.
2. The game asks five questions from that stage's question bank.
3. After each answer it shows whether the answer was right and explains why.
4. At the end of the stage, three or more correct answers unlock the next stage. Fewer than three means the player can try again.

Game state (screen, stage, score, used questions and skill estimates) lives in a single reducer in `App.jsx`, so every change follows one clear path.

## The adaptive engine

The AI component lives in `src/adaptive.js`. It works as a simple learner model, inspired by knowledge tracing, in three steps:

1. Keep one **skill estimate** per subject on the same scale as the question levels (1 = easy, 2 = medium, 3 = hard). Every player starts at 2.
2. After each answer, **update** the estimate.
3. **Pick** the unused question in the stage whose level is closest to the estimate.

| Event | Change to skill estimate |
|---|---|
| Correct answer | +0.35 |
| Correct answer after using a hint | +0.15 |
| Wrong answer | −0.50 |

The estimate is always kept between 1 and 3. The values are starting points that can be tuned in `updateSkill`.

## Adding or editing questions

Questions live in `src/data/questions.js`. Each entry follows this format:

```js
// [stage, level (1 easy – 3 hard), question, options, index of correct answer, explanation]
[1, 1, "Which bird, once found on Mauritius, is now extinct?",
  ["Dodo", "Flamingo", "Parrot", "Owl"], 0,
  "The dodo disappeared in the 1600s, after the Dutch arrived."],
```

Guidelines:

- Give every stage at least two questions at each difficulty level, so the adaptive engine always has a choice.
- Keep explanations short and suitable for a primary school pupil.
- Check every fact against the PSAC textbook and record the source.

## Content accuracy

The questions were drafted for this project and must be verified against the PSAC textbook and authoritative sources before the game is used for real revision. Each question should be checked by a second team member.

## Team and division of work

| Part | Member | Focus |
|---|---|---|
| 1 | [Name] | Educational content and game design |
| 2 | [Name] | React front-end development |
| 3 | [Name] | Adaptive AI engine, testing and evaluation |

The full plan is in the group report (`Hixtory_Group_Report.docx`).

### Git workflow

- `main` always contains working code.
- Each member works on their own branch, for example `part-1-content`, `part-2-frontend` and `part-3-adaptive`.
- Changes reach `main` through a pull request reviewed by another member.

```bash
git checkout -b part-2-frontend
git add .
git commit -m "Describe what changed"
git push -u origin part-2-frontend
```

## Roadmap

- [ ] Expand the question bank to at least 60 verified questions
- [ ] Split the interface into separate components
- [ ] Save progress in the browser
- [ ] Improve responsive layout and keyboard accessibility
- [ ] Unit tests for the adaptive engine
- [ ] Learner simulations and a small pilot test
- [ ] Optional: AI tutor that explains wrong answers (requires a server to keep the API key private)

## Privacy

The game stores no names, accounts or personal data.

## Academic use

This project was created for coursework at the University of Mauritius. Please contact the team before reusing it.
