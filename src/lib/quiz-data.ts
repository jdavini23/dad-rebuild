export type DepletionType = "ghost" | "engine" | "bouncer" | "sleeper";

export interface QuizOption {
  label: string;
  type: DepletionType;
  points: number;
}

export interface QuizQuestion {
  prompt: string;
  options: QuizOption[];
}

export const QUESTIONS: QuizQuestion[] = [
  {
    prompt:
      "it's 7am on a workday. before you've even had coffee, how do you feel about the day ahead?",
    options: [
      { label: "honestly nothing. you just move.", type: "ghost", points: 2 },
      { label: "already running the to-do list in your head.", type: "engine", points: 2 },
      { label: "tense. like one wrong thing will set you off.", type: "bouncer", points: 2 },
      { label: "wrecked. you didn't sleep and the day hasn't started.", type: "sleeper", points: 2 },
    ],
  },
  {
    prompt:
      "your kid asks you to play for the tenth time today. what actually happens inside you?",
    options: [
      { label: "you say yes but you're not really there.", type: "ghost", points: 2 },
      {
        label: "you calculate how it fits around everything else you have to do.",
        type: "engine",
        points: 2,
      },
      { label: "you feel the snap coming and have to swallow it.", type: "bouncer", points: 3 },
      { label: "you want to but there's nothing left in the tank.", type: "sleeper", points: 2 },
    ],
  },
  {
    prompt: "when's the last time you felt like yourself?",
    options: [
      { label: "can't remember. that guy feels gone.", type: "ghost", points: 3 },
      { label: "i don't have time to think about that.", type: "engine", points: 2 },
      { label: "when i'm not on edge, which is rare.", type: "bouncer", points: 1 },
      { label: "when i was rested, so a while ago.", type: "sleeper", points: 2 },
    ],
  },
  {
    prompt: "it's 9pm, kids are down. what do you do?",
    options: [
      { label: "scroll on the couch and feel nothing.", type: "ghost", points: 2 },
      { label: "more work. there's always more.", type: "engine", points: 3 },
      { label: "decompress hard because you held it together all day.", type: "bouncer", points: 2 },
      { label: "pass out, or fight to stay awake.", type: "sleeper", points: 2 },
    ],
  },
  {
    prompt: "how's your body feeling lately?",
    options: [
      { label: "don't really notice it anymore.", type: "ghost", points: 2 },
      { label: "ignoring it. no time.", type: "engine", points: 2 },
      { label: "tight. jaw, shoulders, like you're braced.", type: "bouncer", points: 2 },
      { label: "heavy and tired no matter how much you rest.", type: "sleeper", points: 3 },
    ],
  },
  {
    prompt: "your partner asks how you're doing. real answer?",
    options: [
      { label: "\"fine.\" you don't even know anymore.", type: "ghost", points: 3 },
      { label: "\"busy.\" always busy.", type: "engine", points: 2 },
      { label: "\"don't ask right now.\"", type: "bouncer", points: 2 },
      { label: "\"exhausted.\"", type: "sleeper", points: 2 },
    ],
  },
  {
    prompt: "what's the thing you feel most guilty about as a dad?",
    options: [
      {
        label: "that you're not really present even when you're home.",
        type: "ghost",
        points: 3,
      },
      { label: "that you're always working instead of being there.", type: "engine", points: 2 },
      { label: "that you lose it with them.", type: "bouncer", points: 3 },
      { label: "that you're too tired to show up the way you want.", type: "sleeper", points: 2 },
    ],
  },
  {
    prompt: "someone cuts you off in traffic with the kids in the car. you…",
    options: [
      { label: "barely register it.", type: "ghost", points: 2 },
      { label: "annoyed, but already thinking about the next thing.", type: "engine", points: 1 },
      { label: "react hard. maybe too hard.", type: "bouncer", points: 3 },
      { label: "too drained to care.", type: "sleeper", points: 1 },
    ],
  },
  {
    prompt: "when do you feel most like a machine instead of a person?",
    options: [
      { label: "all the time. it's like nobody's home.", type: "ghost", points: 2 },
      { label: "every day. you just produce.", type: "engine", points: 3 },
      { label: "when you're holding back what you actually feel.", type: "bouncer", points: 2 },
      { label: "when you're pushing through on no sleep.", type: "sleeper", points: 2 },
    ],
  },
  {
    prompt: "what would actually help you most right now?",
    options: [
      { label: "feeling something again.", type: "ghost", points: 3 },
      { label: "an extra set of hands so you could stop.", type: "engine", points: 2 },
      { label: "not snapping at the people you love.", type: "bouncer", points: 3 },
      { label: "a full night of sleep.", type: "sleeper", points: 3 },
    ],
  },
  {
    prompt: "how often do you do something just for you?",
    options: [
      { label: "you don't even know what that would be anymore.", type: "ghost", points: 3 },
      { label: "never. it feels selfish.", type: "engine", points: 2 },
      { label: "rarely, and you're too wound up to enjoy it.", type: "bouncer", points: 1 },
      { label: "rarely. you'd rather sleep.", type: "sleeper", points: 2 },
    ],
  },
  {
    prompt: "finish this sentence: \"i'm running on…\"",
    options: [
      { label: "autopilot.", type: "ghost", points: 3 },
      { label: "momentum. if you stop you collapse.", type: "engine", points: 3 },
      { label: "a short fuse.", type: "bouncer", points: 3 },
      { label: "empty.", type: "sleeper", points: 3 },
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
    name: "THE GHOST",
    headline: "you're here, but you're not.",
    whatsHappening:
      "identity depletion. you've given so much for so long there's no \"you\" left under the dad, the worker, the provider. you're not angry. you're not even sad. you're just gone. autopilot got you through, and now autopilot is all you've got.",
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
    name: "THE ENGINE",
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
    name: "THE BOUNCER",
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
    name: "THE SLEEPER",
    headline: "you're running on empty and pretending you're not.",
    whatsHappening:
      "physical depletion. the most basic system is offline. you're not getting real rest, so everything else, your patience, your focus, your body, your mood, runs on fumes. you've normalized exhaustion until you think this is just what being a dad feels like. it's not. you're depleted at the root.",
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
    if (opt) scores[opt.type] += opt.points;
  });
  return scores;
}

export function computeResult(scores: Scores): DepletionType {
  const max = Math.max(...TIEBREAK_PRIORITY.map((t) => scores[t]));
  return TIEBREAK_PRIORITY.find((t) => scores[t] === max) ?? "ghost";
}
