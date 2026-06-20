// TODO: replace with your ConvertKit/Kit form submit endpoint
export const CONVERTKIT_WEBHOOK_URL = "https://app.convertkit.com/forms/REPLACE_ME/subscriptions";

export type DepletionType = "ghost" | "engine" | "bouncer" | "sleeper";

// "managing" options score 0. They never produce a result type; they only
// pull the severity total down (fewer managing picks means a higher score).
export type OptionType = DepletionType | "managing";

export interface QuizOption {
  label: string;
  type: OptionType;
  points: number;
}

export interface QuizQuestion {
  prompt: string;
  options: QuizOption[];
}

export const QUESTIONS: QuizQuestion[] = [
  {
    prompt: "the drive or walk home from work. what's actually running in your head?",
    options: [
      { label: "still working the problems. you never really clock out.", type: "engine", points: 3 },
      { label: "nothing. blank. just get there and get through it.", type: "ghost", points: 3 },
      {
        label: "already bracing for the noise and the asks before you're even inside.",
        type: "bouncer",
        points: 3,
      },
      { label: "counting the hours until you can lie down.", type: "sleeper", points: 3 },
      { label: "you wind down on the way and walk in steady.", type: "managing", points: 0 },
    ],
  },
  {
    prompt: "your kid asks you to play for the tenth time today. what happens inside you?",
    options: [
      { label: "you say yes, but you're somewhere else the whole time.", type: "ghost", points: 2 },
      {
        label: "you're already calculating what it costs you on everything else.",
        type: "engine",
        points: 2,
      },
      { label: "you feel the snap rising and swallow it.", type: "bouncer", points: 3 },
      { label: "you want to, but the tank is empty.", type: "sleeper", points: 2 },
      { label: "you drop in and actually play.", type: "managing", points: 0 },
    ],
  },
  {
    prompt: "your kid has a full meltdown in public. your honest first reaction?",
    options: [
      { label: "heat shoots up. you're one breath from losing it.", type: "bouncer", points: 3 },
      { label: "you go cold and handle it like a machine.", type: "ghost", points: 2 },
      { label: "mostly you're annoyed it's eating time you don't have.", type: "engine", points: 2 },
      { label: "you're too wiped to react. you just want it to stop.", type: "sleeper", points: 2 },
      { label: "you stay steady and work the problem.", type: "managing", points: 0 },
    ],
  },
  {
    prompt: "kids are finally down, it's 9pm. what do you actually do?",
    options: [
      { label: "scroll the couch and feel basically nothing.", type: "ghost", points: 3 },
      { label: "back to work, or the side project. there's always more.", type: "engine", points: 3 },
      { label: "decompress hard. you white-knuckled it all day.", type: "bouncer", points: 2 },
      { label: "fight to stay awake, or you're already gone.", type: "sleeper", points: 3 },
      { label: "something that's actually yours, and you enjoy it.", type: "managing", points: 0 },
    ],
  },
  {
    prompt: "think about your body right now. what's the read?",
    options: [
      { label: "you've stopped noticing it.", type: "ghost", points: 2 },
      { label: "you're ignoring it. no time to deal with it.", type: "engine", points: 2 },
      { label: "tight everywhere. jaw, shoulders, braced for impact.", type: "bouncer", points: 3 },
      { label: "heavy and drained no matter how much you sleep.", type: "sleeper", points: 3 },
      { label: "decent. you move, you feel it working.", type: "managing", points: 0 },
    ],
  },
  {
    prompt: "the last few weeks of sleep. the truth?",
    options: [
      { label: "you sleep, but wake up just as empty.", type: "ghost", points: 2 },
      { label: "you'd sleep if your brain would stop running.", type: "engine", points: 2 },
      { label: "you lie there wired and tense.", type: "bouncer", points: 2 },
      {
        label: "you stay up too late for the only time that feels like yours, then pay for it.",
        type: "sleeper",
        points: 3,
      },
      { label: "you sleep fine and wake up okay.", type: "managing", points: 0 },
    ],
  },
  {
    prompt: "your partner asks how you're really doing. the answer you don't say out loud?",
    options: [
      { label: "\"i don't know anymore.\"", type: "ghost", points: 3 },
      { label: "\"i can't stop, or it all falls apart.\"", type: "engine", points: 3 },
      { label: "\"don't poke me right now.\"", type: "bouncer", points: 3 },
      { label: "\"i'm so tired i can't think.\"", type: "sleeper", points: 3 },
      { label: "\"i'm good, actually.\" and you mean it.", type: "managing", points: 0 },
    ],
  },
  {
    prompt: "the thing you feel worst about as a Dad, the one that finds you at night.",
    options: [
      { label: "that you're physically there, but they're not getting you.", type: "ghost", points: 3 },
      { label: "that you're always working instead of with them.", type: "engine", points: 3 },
      { label: "that you lose it with the people you'd die for.", type: "bouncer", points: 3 },
      { label: "that you're too drained to be who they need.", type: "sleeper", points: 3 },
    ],
  },
  {
    prompt: "the last time you did something purely because you wanted to?",
    options: [
      { label: "you can't think of what that would even be.", type: "ghost", points: 3 },
      { label: "can't justify it. feels selfish with everything undone.", type: "engine", points: 3 },
      { label: "you tried, but you were too wound up to enjoy it.", type: "bouncer", points: 2 },
      { label: "you'd pick sleep over it every time.", type: "sleeper", points: 2 },
      { label: "recently. you protect that time.", type: "managing", points: 0 },
    ],
  },
  {
    prompt:
      "picture this exact version of you a year from now, nothing changed. what's the feeling?",
    options: [
      { label: "a stranger. you won't know that guy at all.", type: "ghost", points: 3 },
      {
        label: "fine, as long as you're still producing. and that's the scary part.",
        type: "engine",
        points: 3,
      },
      { label: "dread. you'll have worn down the people at home by then.", type: "bouncer", points: 3 },
      { label: "you can't even picture it. too tired to think that far out.", type: "sleeper", points: 2 },
      { label: "steady. you're on a path you believe in.", type: "managing", points: 0 },
    ],
  },
  {
    prompt: "you get one free hour. nobody needs you, no obligations. what happens?",
    options: [
      {
        label: "you reach for your phone and look up an hour later, not sure where it went.",
        type: "ghost",
        points: 2,
      },
      { label: "you fill it with something productive without thinking.", type: "engine", points: 3 },
      { label: "you can't settle. restless, on edge.", type: "bouncer", points: 2 },
      { label: "you sleep, or wish you could.", type: "sleeper", points: 3 },
      { label: "you do something that fills you back up.", type: "managing", points: 0 },
    ],
  },
];

export interface ResultContent {
  name: string;
  headline: string;
  whatsHappening: string;
  mistake: string;
  protocol: string[];
  shareLine: string;
}

export const RESULTS: Record<DepletionType, ResultContent> = {
  ghost: {
    name: "the Ghost",
    headline: "you're here, but you're not.",
    whatsHappening:
      "identity depletion. you've given so much for so long there's no \"you\" left under the Dad, the worker, the provider. you're not angry. you're not even sad. you're just gone. autopilot got you through, and now autopilot is all you've got.",
    mistake:
      "waiting to \"feel like\" doing something before you do it. the feeling comes back after you act, not before. you're waiting for a signal that won't show up on its own.",
    protocol: [
      "one real thing a day. ten minutes on something that's yours. not the family's, not work's. a walk, a record, a page. small. yours.",
      "name one thing you felt, out loud or written, once a day. not to fix it. just to prove the wiring still works.",
      "one undistracted hour with your kid, phone in another room. presence is a muscle. you rebuild it by using it.",
    ],
    shareLine: "i'm a ghost. what'd you get?",
  },
  engine: {
    name: "the Engine",
    headline: "you never stop, and that's the problem.",
    whatsHappening:
      "output depletion. you turned yourself into a productivity machine. your worth got tied to tasks done, and now stopping feels like failing. but engines that never cool down seize up. you're not heading for burnout someday. you're in it. you just move fast enough to outrun the feeling.",
    mistake:
      "treating rest as a reward you earn after the list is done. the list is never done. rest isn't the prize. it's the maintenance that keeps the engine running.",
    protocol: [
      "one hard stop a day. pick a time. when you hit it, you're done working. the world keeps spinning. test it.",
      "ten minutes of doing nothing productive. no podcast, no learning, no optimizing. just sit. this will feel insane. do it anyway.",
      "write down one thing you did that mattered that wasn't a task. showed up. listened. were there. retrain what counts.",
    ],
    shareLine: "i'm an engine. what'd you get?",
  },
  bouncer: {
    name: "the Bouncer",
    headline: "you're on a hair trigger and you hate it.",
    whatsHappening:
      "regulation depletion. you spend the whole day holding it together, and by the time you're home the tank that controls your reactions is empty. so you snap. then you feel like garbage. then you swear you won't again, and you do. it's not a character flaw. it's a depleted system with no margin left.",
    mistake:
      "trying to control the snap in the moment. by then it's too late. the fix isn't more willpower at 6pm. it's refueling the tank earlier so there's something left to draw on.",
    protocol: [
      "a 90-second reset before you walk in the door. car still in park. three slow breaths. decide who you want to be when you open it. you're not home until you've done it.",
      "one physical release a day. walk, lift, push-ups, anything that burns off the braced energy your body is holding. the tension has to go somewhere.",
      "when you feel the heat rise, name it before you act: \"i'm spiking.\" one second of naming it buys you the gap you need.",
    ],
    shareLine: "i'm a bouncer. what'd you get?",
  },
  sleeper: {
    name: "the Sleeper",
    headline: "you're running on empty and pretending you're not.",
    whatsHappening:
      "physical depletion. the most basic system is offline. you're not getting real rest, so everything else, your patience, your focus, your body, your mood, runs on fumes. you've normalized exhaustion until you think this is just what being a Dad feels like. it's not. you're depleted at the root.",
    mistake:
      "stealing from sleep to get \"you time\" at night, then wondering why tomorrow is worse. the late-night scroll isn't rest. it's a withdrawal you pay for at 7am.",
    protocol: [
      "a hard bedtime, same time every night. pick it. defend it like an appointment. this is the whole game.",
      "no screen in bed. charge the phone across the room. the scroll is what's robbing you.",
      "ten minutes of daylight and movement in the morning. it sets the clock that runs the whole system. cheap, fast, works.",
    ],
    shareLine: "i'm a sleeper. what'd you get?",
  },
};

const TIEBREAK_PRIORITY: DepletionType[] = ["bouncer", "ghost", "sleeper", "engine"];

export type Scores = Record<DepletionType, number>;

export const emptyScores = (): Scores => ({ ghost: 0, engine: 0, bouncer: 0, sleeper: 0 });

export function computeScores(answers: (number | undefined)[]): Scores {
  const scores = emptyScores();
  answers.forEach((idx, qi) => {
    if (idx === undefined) return;
    const opt = QUESTIONS[qi]?.options[idx];
    if (opt && opt.type !== "managing") scores[opt.type] += opt.points;
  });
  return scores;
}

// how many questions each type was actually picked in (managing excluded).
// used as the first tiebreak when two types tie on points.
export function computeCounts(answers: (number | undefined)[]): Scores {
  const counts = emptyScores();
  answers.forEach((idx, qi) => {
    if (idx === undefined) return;
    const opt = QUESTIONS[qi]?.options[idx];
    if (opt && opt.type !== "managing") counts[opt.type] += 1;
  });
  return counts;
}

export function computeResult(scores: Scores, counts: Scores): DepletionType {
  const maxPoints = Math.max(...TIEBREAK_PRIORITY.map((t) => scores[t]));
  let candidates = TIEBREAK_PRIORITY.filter((t) => scores[t] === maxPoints);
  // first tiebreak: the type the Dad selected most often.
  if (candidates.length > 1) {
    const maxCount = Math.max(...candidates.map((t) => counts[t]));
    candidates = candidates.filter((t) => counts[t] === maxCount);
  }
  // final tiebreak: fixed priority order (TIEBREAK_PRIORITY is already in order).
  return TIEBREAK_PRIORITY.find((t) => candidates.includes(t)) ?? "ghost";
}

// total type points across all answers (managing scores 0, so it just lowers
// the total). drives the severity read.
export function computeSeverity(scores: Scores): number {
  return scores.ghost + scores.engine + scores.bouncer + scores.sleeper;
}

export type SeverityId = "running-low" | "depleted" | "running-on-empty";

export interface SeverityBand {
  id: SeverityId;
  label: string;
}

// starting bands, calibrate against real responses.
export function severityBand(total: number): SeverityBand {
  if (total >= 23) return { id: "running-on-empty", label: "running on empty" };
  if (total >= 14) return { id: "depleted", label: "depleted" };
  return { id: "running-low", label: "running low" };
}
