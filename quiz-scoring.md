# The Depleted Dad Diagnostic — Scoring & Results

Source: `src/lib/quiz-data.ts`

## How scoring works

1. **Tally points.** Every answer adds its point value to one of four depletion types: `ghost`, `engine`, `bouncer`, `sleeper`. (Points per option are listed in `quiz-questions.md`.)
2. **Highest total wins.** The depletion type with the most accumulated points is the result.
3. **Tiebreak.** If two or more types tie for the highest score, the winner is chosen by this fixed priority order:

   ```
   bouncer  >  ghost  >  sleeper  >  engine
   ```

   (i.e. `bouncer` beats everything, `engine` only wins outright.)

### Reference logic

```ts
const TIEBREAK_PRIORITY = ["bouncer", "ghost", "sleeper", "engine"];

function computeScores(answers) {
  const scores = { ghost: 0, engine: 0, bouncer: 0, sleeper: 0 };
  answers.forEach((idx, qi) => {
    const opt = QUESTIONS[qi]?.options[idx];
    if (opt) scores[opt.type] += opt.points;
  });
  return scores;
}

function computeResult(scores) {
  const max = Math.max(...TIEBREAK_PRIORITY.map((t) => scores[t]));
  return TIEBREAK_PRIORITY.find((t) => scores[t] === max) ?? "ghost";
}
```

### Max possible points per type

Summing every option of each type across the 12 questions:

| Type | Max points | Depletion |
| --- | --- | --- |
| ghost | 30 | identity depletion |
| engine | 26 | output depletion |
| bouncer | 27 | regulation depletion |
| sleeper | 27 | physical depletion |

(In a real run only one option per question is chosen, so actual totals are far lower — these are theoretical ceilings if a single type were picked every time.)

---

## Results

### THE GHOST — identity depletion
**Headline:** you're here, but you're not.

**What's happening:** identity depletion. you've given so much for so long there's no "you" left under the dad, the worker, the provider. you're not angry. you're not even sad. you're just gone. autopilot got you through, and now autopilot is all you've got.

**The #1 mistake:** waiting to "feel like" doing something before you do it. the feeling comes back after you act, not before. you're waiting for a signal that won't show up on its own.

**14-day protocol:**
1. one real thing a day. ten minutes on something that's yours. not the family's, not work's. a walk, a record, a page. small. yours.
2. name one thing you felt, out loud or written, once a day. not to fix it. just to prove the wiring still works.
3. one undistracted hour with your kid, phone in another room. presence is a muscle. you rebuild it by using it.

**Share line:** i'm a ghost. what'd you get?

---

### THE ENGINE — output depletion
**Headline:** you never stop, and that's the problem.

**What's happening:** output depletion. you turned yourself into a productivity machine. your worth got tied to tasks done, and now stopping feels like failing. but engines that never cool down seize up. you're not heading for burnout someday. you're in it. you just move fast enough to outrun the feeling.

**The #1 mistake:** treating rest as a reward you earn after the list is done. the list is never done. rest isn't the prize. it's the maintenance that keeps the engine running.

**14-day protocol:**
1. one hard stop a day. pick a time. when you hit it, you're done working. the world keeps spinning. test it.
2. ten minutes of doing nothing productive. no podcast, no learning, no optimizing. just sit. this will feel insane. do it anyway.
3. write down one thing you did that mattered that wasn't a task. showed up. listened. were there. retrain what counts.

**Share line:** i'm an engine. what'd you get?

---

### THE BOUNCER — regulation depletion
**Headline:** you're on a hair trigger and you hate it.

**What's happening:** regulation depletion. you spend the whole day holding it together, and by the time you're home the tank that controls your reactions is empty. so you snap. then you feel like garbage. then you swear you won't again, and you do. it's not a character flaw. it's a depleted system with no margin left.

**The #1 mistake:** trying to control the snap in the moment. by then it's too late. the fix isn't more willpower at 6pm. it's refueling the tank earlier so there's something left to draw on.

**14-day protocol:**
1. a 90-second reset before you walk in the door. car still in park. three slow breaths. decide who you want to be when you open it. you're not home until you've done it.
2. one physical release a day. walk, lift, push-ups, anything that burns off the braced energy your body is holding. the tension has to go somewhere.
3. when you feel the heat rise, name it before you act: "i'm spiking." one second of naming it buys you the gap you need.

**Share line:** i'm a bouncer. what'd you get?

---

### THE SLEEPER — physical depletion
**Headline:** you're running on empty and pretending you're not.

**What's happening:** physical depletion. the most basic system is offline. you're not getting real rest, so everything else, your patience, your focus, your body, your mood, runs on fumes. you've normalized exhaustion until you think this is just what being a dad feels like. it's not. you're depleted at the root.

**The #1 mistake:** stealing from sleep to get "you time" at night, then wondering why tomorrow is worse. the late-night scroll isn't rest. it's a withdrawal you pay for at 7am.

**14-day protocol:**
1. a hard bedtime, same time every night. pick it. defend it like an appointment. this is the whole game.
2. no screen in bed. charge the phone across the room. the scroll is what's robbing you.
3. ten minutes of daylight and movement in the morning. it sets the clock that runs the whole system. cheap, fast, works.

**Share line:** i'm a sleeper. what'd you get?
