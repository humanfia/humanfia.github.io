// Every flow in the catalogue, and the scene each one's diagram plays, in one place.
//
// Three things are written down here: how the catalogue is sorted (KINDS), what a flow *is* --
// its name, the roles `-a` fills, what ends it, what `--resume` carries -- which <FlowCatalogue>
// tiles on /flows/, and what a run of it *looks like*, as a scene <FlowPlayer> plays on each
// flow's page and <FlowThumb> plays, small, on its tile. Keeping all three here means the catalogue and the diagrams cannot disagree.
//
// Everything is read off the flows themselves: humanize's `src/hmz/flows/builtin/` for `chat`
// and the six loops beside it, and for the rest the repository each is released from, as the
// official flowverse (https://github.com/humanfia/flowverse) lists it. What a release *ships
// as* -- its versions, its pinned commit, its licence, its README -- is not written here at all:
// `.vitepress/flowverse.mts` reads it from the flowverse on every build, by the `module` named
// below. The visual grammar every scene is drawn in is `components/flow/grammar.ts`.
//
// These pages moved here from humanize's documentation, at the same slugs, so every
// link to a flow's page there (`flows/<slug>` under its base) lands on `/flows/<slug>`.
//
// This file is imported by the dynamic route (`flows/[slug].paths.mts`) as well as by the
// theme, so it imports nothing.

/* ------------------------------------------------------------------------------------------
   How the catalogue is sorted: by how the agents in a flow work together.
   ------------------------------------------------------------------------------------------ */

export type Kind = 'talk' | 'solo' | 'relay' | 'tidy' | 'checked' | 'lanes' | 'split'

export interface KindInfo {
  id: Kind
  /** What the kind is called. */
  said: string
  /** One line: the pattern every flow under it shares. */
  how: string
}

export const KINDS: KindInfo[] = [
  { id: 'talk', said: 'Talk', how: 'You and one agent, turn for turn.' },
  { id: 'solo', said: 'One agent, looping', how: 'One agent takes round after round on the same task.' },
  { id: 'relay', said: 'Agents take turns', how: 'Two agents hand the same tree back and forth.' },
  {
    id: 'tidy',
    said: 'A loop with a cleaner',
    how: 'A loop, and a cleaner that distills the tree into one commit every few turns.',
  },
  {
    id: 'checked',
    said: 'Maker and checker',
    how: 'One agent makes, and a fresh one, which never saw it made, judges it.',
  },
  { id: 'lanes', said: 'Parallel lanes', how: 'Several workspaces, each with agents of its own, at the same time.' },
  { id: 'split', said: 'Divide and conquer', how: 'The task splits into parts, and each part runs the same line.' },
]

/* ------------------------------------------------------------------------------------------
   What a reader may be trying to get done with a flow.
   ------------------------------------------------------------------------------------------ */

export type Job = 'talk' | 'grind' | 'review' | 'pair' | 'plan' | 'parallel' | 'score' | 'lean' | 'write'

/* ------------------------------------------------------------------------------------------
   The flows.
   ------------------------------------------------------------------------------------------ */

export interface Flow {
  /** The name the catalogue lists it under. For every flow but `humanize1` it is also what
   *  `-f` and `$` take; `humanize1` holds three flows, each run as `humanize1:<phase>`. */
  name: string
  /** The flows a module of several holds, each run as `<name>:<phase>`. */
  phases?: string[]
  /** Its page is /flows/<slug>: the same slug it had in humanize's documentation, which
   *  redirects there. */
  slug: string
  /** The flowverse module it is released in, which is where its versions, repository and
   *  licence are read from at build time. Absent for a flow that ships inside humanize. */
  module?: string
  /** The page under /flows/. Every flow has one of its own. */
  link: string
  /** The roles `-a` fills, as it names them. */
  roles: string
  /** One line: what it does. */
  said: string
  /** What ends it, besides the run's budget. */
  ends: string
  /** What a run picked up with `--resume` carries in, or "" for one that always starts afresh. */
  keeps: string
  jobs: Job[]
  kind: Kind
  /** The scene its card draws, by its key in SCENES. */
  scene: string
  /** Drawn big, at the head of the catalogue, in this order: the flows to start from. */
  featured?: number
  /** Left off the catalogue (its page stays): a flow that is a conversation, not a loop. */
  unlisted?: true
}

export const FLOWS: Flow[] = [
  {
    name: 'chat',
    slug: 'chat',
    link: '/flows/chat',
    roles: 'assistant',
    said: 'One agent, one conversation: every line you type back is its next turn.',
    ends: 'you send nothing back, so under hmz exec after one turn',
    keeps: 'the conversation',
    jobs: ['talk'],
    kind: 'talk',
    scene: 'chat',
    unlisted: true,
  },
  {
    name: 'ralph_loop',
    slug: 'ralph-loop',
    link: '/flows/ralph-loop',
    roles: 'agent',
    said: 'The task again every round, in a fresh session, so only the repository carries over.',
    ends: 'a turn that fails',
    keeps: '',
    jobs: ['grind'],
    kind: 'solo',
    scene: 'ralph_loop',
  },
  {
    name: 'stateful_ralph',
    slug: 'stateful-ralph',
    link: '/flows/stateful-ralph',
    roles: 'agent',
    said: 'The task again every round, in one session that remembers every round before.',
    ends: 'a turn that fails',
    keeps: 'the session',
    jobs: ['grind'],
    kind: 'solo',
    scene: 'stateful_ralph',
  },
  {
    name: 'continue_loop',
    slug: 'continue-loop',
    link: '/flows/continue-loop',
    roles: 'agent',
    said: 'The task once, then “continue” to the same session, round after round.',
    ends: 'a turn that fails',
    keeps: '',
    jobs: ['grind'],
    kind: 'solo',
    scene: 'continue_loop',
  },
  {
    name: 'goal',
    slug: 'goal',
    link: '/flows/goal',
    roles: 'worker',
    said: 'The task set as the agent’s own /goal: the model keeps going until it says the goal is met.',
    ends: 'the model says the goal is met',
    keeps: '',
    jobs: ['grind'],
    kind: 'solo',
    scene: 'goal',
  },
  {
    name: 'flame_chase',
    slug: 'flame-chase',
    link: '/flows/flame-chase',
    roles: 'first_chaser · second_chaser',
    said: 'Two agents take turns on the same task, each in a fresh session, passing only the tree.',
    ends: 'a turn that fails',
    keeps: 'whose turn is next',
    jobs: ['pair'],
    kind: 'relay',
    scene: 'flame_chase',
    featured: 1,
  },
  {
    name: 'flame_chasoid:fixed_interrupt',
    slug: 'fixed-interrupt-flame-chase',
    module: 'flame_chasoid',
    link: '/flows/fixed-interrupt-flame-chase',
    roles: 'first_chaser · second_chaser',
    said: 'flame_chase on a clock: a trusted evaluator hands the tree over after every k accepted experiments, and one blind review picks the winner.',
    ends: 'the wall clock, after one final review',
    keeps: '',
    jobs: ['pair', 'score'],
    kind: 'relay',
    scene: 'fixed_interrupt_flame_chase',
  },
  {
    name: 'flame_chasoid:agent_cleanup_ralph_loop',
    slug: 'ralph-loop-agent-cleanup',
    module: 'flame_chasoid',
    link: '/flows/ralph-loop-agent-cleanup',
    roles: 'agent · cleaner',
    said: 'ralph_loop, plus a cleaner that distills the tree into one commit every few turns.',
    ends: '3 turns in a row that come to nothing',
    keeps: 'the turn count and the epochs',
    jobs: ['grind'],
    kind: 'tidy',
    scene: 'ralph_loop_agent_cleanup',
    featured: 4,
  },
  {
    name: 'flame_chasoid:agent_cleanup_flame_chase',
    slug: 'flame-chase-agent-cleanup',
    module: 'flame_chasoid',
    link: '/flows/flame-chase-agent-cleanup',
    roles: 'first_chaser · second_chaser · cleaner',
    said: 'flame_chase, with the same cleaner working between the two chasers.',
    ends: '3 turns in a row that come to nothing',
    keeps: 'the turn count and the epochs',
    jobs: ['pair'],
    kind: 'tidy',
    scene: 'flame_chase_agent_cleanup',
    featured: 5,
  },
  {
    name: 'rlar',
    slug: 'rlar',
    link: '/flows/rlar',
    roles: 'actor · reviewer',
    said: 'An actor works in one session; a fresh reviewer reads the work and writes its next prompt.',
    ends: 'the reviewer says the task is done, or a turn that fails',
    keeps: 'the last review',
    jobs: ['review', 'pair'],
    kind: 'checked',
    scene: 'rlar',
  },
  {
    name: 'humanize1',
    phases: ['gen-idea', 'gen-plan', 'rlcr'],
    slug: 'humanize1',
    module: 'humanize1',
    link: '/flows/humanize1',
    roles: 'drafter · planner, analyst · builder, reviewer',
    said: 'PolyArch/humanize as three flows: an idea, a plan both sides agreed on, and a build under review.',
    ends: 'each phase on its own; rlcr when the reviewer finds nothing left, or after max rounds',
    keeps: 'rlcr only: its loop and round',
    jobs: ['review', 'plan'],
    kind: 'checked',
    scene: 'humanize1-rlcr',
    featured: 2,
  },
  {
    name: 'aot',
    slug: 'aot',
    module: 'aot',
    link: '/flows/aot',
    roles: 'writer · critic',
    said: 'Writes a flow from your description, and lands it once it loads, runs on fakes and passes a critic.',
    ends: 'the flow lands, or the repairs run out',
    keeps: '',
    jobs: ['write'],
    kind: 'checked',
    scene: 'aot',
  },
  {
    name: 'flame_chasoid:parallel',
    slug: 'parallel-flame-chase',
    module: 'flame_chasoid',
    link: '/flows/parallel-flame-chase',
    roles: 'coordinator · six lane actors',
    said: 'A coordinator plans three lanes once; lane 1 writes your tree, lanes 2 and 3 work on copies.',
    ends: 'nothing but the budget, or you',
    keeps: 'the plan, the copies, the reports, whose turn each lane is on',
    jobs: ['parallel'],
    kind: 'lanes',
    scene: 'parallel_flame_chase',
  },
  {
    name: 'flame_chasoid:parallel_git_pr',
    slug: 'parallel-flame-chase-git-pr',
    module: 'flame_chasoid',
    link: '/flows/parallel-flame-chase-git-pr',
    roles: 'orchestrator · six lane actors',
    said: 'Three lanes, each with a clone and pull requests; main moves only for a measured improvement.',
    ends: 'nothing but the budget, or you',
    keeps: 'the central repository, the receipts, the reports',
    jobs: ['parallel', 'score'],
    kind: 'lanes',
    scene: 'parallel_flame_chase_git_pr',
    featured: 3,
  },
  {
    name: 'recursive_lean_prover',
    slug: 'recursive-lean-prover',
    module: 'recursive_lean_prover',
    link: '/flows/recursive-lean-prover',
    roles: 'worker · reviewer',
    said: 'A Lean theorem, split into lemmas that are each planned, proved and formalized in a worktree of their own.',
    ends: 'the root theorem is proved, or refused',
    keeps: 'the lemmas proved so far, their branches and the wiki',
    jobs: ['lean'],
    kind: 'split',
    scene: 'recursive_lean_prover',
  },
]

/* ------------------------------------------------------------------------------------------
   The scenes. What one run of a flow looks like, played left to right by <HmzFlow>.

   A scene is read off the flow, never invented for the picture: every role is one the flow
   drives, every turn one it takes, and `session` says whether the flow opened a session for
   that turn (`new`), sent another turn to one it already had (`held`), or took no turn of a
   model at all (`none`: you, or a program). That distinction is most of what separates these
   flows from each other, so it is what the grammar draws most plainly.
   ------------------------------------------------------------------------------------------ */

/** What a role is, which is what colour and shape it is drawn in. A `maker` does the work and
 *  a `partner` is a second one taking turns with it; a `checker` reads and judges; a `steward`
 *  shapes the work -- plans the lanes, cleans the tree -- without doing or judging it. `human`
 *  is you, and `program` is Humanize or your script: a step with no model in it. */
export type RoleKind = 'maker' | 'partner' | 'checker' | 'steward' | 'human' | 'program'

/** What a turn does, drawn as the glyph in its box. */
export type Does = 'work' | 'read' | 'plan' | 'ask' | 'run'

/** What ends a run: the flow's own success, the flow giving up, the budget, or you. */
export type Outcome = 'done' | 'fail' | 'budget' | 'you'

export interface Env {
  id: string
  /** Where the roles on it work, as the plate under them says it. */
  name: string
  /** Which layer of a `depth: 'lanes'` scene it is: plates with an index here are the lanes
   *  that run at once, and the camera fans them out in depth while they do. */
  stack?: number
}

export interface Role {
  id: string
  name: string
  note: string
  kind: RoleKind
  /** The workspace it works in, by id in `envs`. */
  env?: string
}

export interface Pass {
  /** A turn's id, or `end` for the finish. */
  to: string
  said: string
  /** How it gets there: as words in the next turn's prompt, or as files left in the tree. */
  via: 'text' | 'tree'
}

export interface Turn {
  id: string
  role: string
  /** When it starts, in beats. Two turns at the same beat happen at once. */
  at: number
  /** How many beats it takes. Default 1. */
  span?: number
  label: string
  session: 'new' | 'held' | 'none'
  /** Default: `work` for an agent, `ask` for you, `run` for a program. */
  does?: Does
  /** Turns of the model inside this one turn of the flow -- what a goal is. */
  inside?: number
  /** The flow this turn runs as a subflow. */
  calls?: string
  pass?: Pass[]
  /** What a review comes back with, stamped on the turn as it lands. Left out, a checker's
   *  turn that hands on to the finish passes, one that hands back to a session already held
   *  rejects, and any other turn is stamped with nothing; `none` says so outright. */
  verdict?: 'pass' | 'reject' | 'none'
  /** What the turn is seen doing while it runs, a few words a moment, in order: the line under
   *  the picture says each in turn as the turn runs through them. */
  doing?: string[]
}

export interface Scene {
  /** The flow it is of, as `-f` takes it. */
  of: string
  roles: Role[]
  envs?: Env[]
  turns: Turn[]
  /** The arc back: what a round ends on, what it starts again at, and why. */
  loop?: { from: string; to: string; said: string }
  /** Every way a run of it ends. The first is the one this diagram plays to. */
  ends: { is: Outcome; said: string }[]
  /** Whether a budget stops it. Every flow but `chat` has one. Default true. */
  budget?: boolean
  /** Three-dimensional staging, where depth says something flat cannot: lanes that run at
   *  once fan out as layers, and a part that splits sends copies of itself down a level. */
  depth?: 'lanes'
  split?: { at: string; into: number; said: string }
  /** How wide a beat is drawn, for a scene with many of them. Default 150. */
  beat?: number
  /** One line under the whole thing. */
  caption: string
}

const tree = (said: string, to: string): Pass[] => [{ to, said, via: 'tree' }]
const text = (said: string, to: string): Pass[] => [{ to, said, via: 'text' }]
const BUDGET = { is: 'budget' as const, said: 'the budget runs out' }

// Each scene follows one example task, most often the one its flow's page runs, so its turns can say
// what they did rather than only that they took a turn. The task's details -- the counts of
// failing tests, the timings, the step a proof breaks at -- are invented for the picture; what
// the flow does with them is not.
export const SCENES: Record<string, Scene> = {
  chat: {
    of: 'chat',
    budget: false,
    envs: [{ id: 'dir', name: 'the directory you started in' }],
    roles: [
      { id: 'you', name: 'you', note: 'at the prompt', kind: 'human' },
      { id: 'agent', name: 'assistant', note: 'one session throughout', kind: 'maker', env: 'dir' },
    ],
    turns: [
      { id: 'y0', role: 'you', at: 0, label: 'what is this repo?', session: 'none', pass: text('the first turn', 'a0') },
      { id: 'a0', role: 'agent', at: 1, label: 'reads, then answers', session: 'new', pass: text('an overview', 'y1') },
      { id: 'y1', role: 'you', at: 2, label: 'where are the tests?', session: 'none', pass: text('the next turn', 'a1') },
      { id: 'a1', role: 'agent', at: 3, label: 'answers, remembering', session: 'held', pass: text('tests/, and how', 'y2') },
      { id: 'y2', role: 'you', at: 4, label: 'run the slow ones', session: 'none', pass: text('the next turn', 'a2') },
      { id: 'a2', role: 'agent', at: 5, label: 'runs them', session: 'held', pass: text('2 of them fail', 'y3') },
      { id: 'y3', role: 'you', at: 6, label: '/stop, or nothing', session: 'none', pass: text('', 'end') },
    ],
    loop: { from: 'a2', to: 'y1', said: 'for as long as you answer' },
    ends: [
      { is: 'you', said: 'you send nothing back' },
      { is: 'fail', said: 'the first turn fails' },
    ],
    caption:
      'Each answer comes to you, and what you type back is the next turn of the same session, which remembers the whole conversation. Send nothing back — or run it under hmz exec, where nobody is at the prompt — and the run ends.',
  },

  // Nothing in this loop reads the tests, so it does not stop when they pass: only the budget,
  // or a turn that fails, ends it.
  ralph_loop: {
    of: 'ralph_loop',
    envs: [{ id: 'repo', name: 'your repository' }],
    roles: [{ id: 'agent', name: 'agent', note: 'a new session a round', kind: 'maker', env: 'repo' }],
    turns: [
      { id: 'r1', role: 'agent', at: 0, label: 'fixes the imports', session: 'new', pass: tree('31 tests failing', 'r2') },
      { id: 'r2', role: 'agent', at: 1, label: 'fixes the parser', session: 'new', pass: tree('12 failing', 'r3') },
      { id: 'r3', role: 'agent', at: 2, label: 'fixes the fixtures', session: 'new', pass: tree('3 failing', 'r4') },
      { id: 'r4', role: 'agent', at: 3, label: 'fixes the last 3', session: 'new', pass: tree('all passing', 'r5') },
      { id: 'r5', role: 'agent', at: 4, label: 'all pass: goes on', session: 'new' },
    ],
    loop: { from: 'r5', to: 'r1', said: 'nothing carries over but the repository' },
    ends: [BUDGET, { is: 'fail', said: 'a turn fails' }],
    caption:
      'Every round starts from the task and from whatever the round before it left in the working directory — never from what it said. With every test passing, the next round starts anyway; a turn that fails ends the run.',
  },

  stateful_ralph: {
    of: 'stateful_ralph',
    envs: [{ id: 'repo', name: 'your repository' }],
    roles: [{ id: 'agent', name: 'agent', note: 'one session, longer', kind: 'maker', env: 'repo' }],
    turns: [
      { id: 's1', role: 'agent', at: 0, label: 'profiles the parser', session: 'new' },
      { id: 's2', role: 'agent', at: 1, label: 'rules out the cache', session: 'held' },
      { id: 's3', role: 'agent', at: 2, label: 'rules out the lexer', session: 'held' },
      { id: 's4', role: 'agent', at: 3, label: 'finds a held buffer', session: 'held' },
      { id: 's5', role: 'agent', at: 4, label: 'frees it, re-checks', session: 'held' },
    ],
    loop: { from: 's5', to: 's2', said: 'the task again, one round longer' },
    ends: [BUDGET, { is: 'fail', said: 'a turn fails' }],
    caption:
      'Every round is sent the task again, in the one session that remembers what it has ruled out. One session is one conversation, so its context grows with every round — the thread thickens — and that is the other limit a long run of this reaches.',
  },

  // Once the agent says it is done, it is told to continue all the same.
  continue_loop: {
    of: 'continue_loop',
    envs: [{ id: 'repo', name: 'your repository' }],
    roles: [{ id: 'agent', name: 'agent', note: 'one session, nudged', kind: 'maker', env: 'repo' }],
    turns: [
      { id: 'c1', role: 'agent', at: 0, label: 'the task: core/', session: 'new' },
      { id: 'c2', role: 'agent', at: 1, label: '“continue”: io/', session: 'held' },
      { id: 'c3', role: 'agent', at: 2, label: '“continue”: cli/', session: 'held' },
      { id: 'c4', role: 'agent', at: 3, label: '“done,” it says', session: 'held' },
      { id: 'c5', role: 'agent', at: 4, label: '“continue” anyway', session: 'held' },
    ],
    loop: { from: 'c5', to: 'c2', said: '“continue”, until the budget is spent' },
    ends: [BUDGET, { is: 'fail', said: 'a turn fails' }],
    caption:
      'The task is sent once, and every turn after it is “continue”: the word means something only to a session that heard the task. It is “continue” even once the agent says it is done.',
  },

  goal: {
    of: 'goal',
    envs: [{ id: 'repo', name: 'your repository' }],
    roles: [{ id: 'agent', name: 'worker', note: 'one session, under a goal', kind: 'maker', env: 'repo' }],
    turns: [
      {
        id: 'g1',
        role: 'agent',
        at: 0,
        span: 5,
        label: '/goal bench under 200 ms',
        session: 'new',
        inside: 9,
        pass: text('met: 184 ms', 'end'),
      },
    ],
    ends: [{ is: 'done', said: 'the model says the goal is met' }, BUDGET],
    caption:
      'One turn of the flow. The ticks inside it are turns the backend started itself — profile, change, measure, again — each one that would have ended starting another, until the model says the goal is met.',
  },

  // Each turn is the other chaser's, and starts from nothing but the task and the tree.
  flame_chase: {
    of: 'flame_chase',
    envs: [{ id: 'repo', name: 'your repository, shared' }],
    roles: [
      { id: 'one', name: 'first_chaser', note: 'a new session a turn', kind: 'maker', env: 'repo' },
      { id: 'two', name: 'second_chaser', note: 'a new session a turn', kind: 'partner', env: 'repo' },
    ],
    turns: [
      { id: 'f1', role: 'one', at: 0, label: 'reads the CSVs', session: 'new', pass: tree('CSV passes', 'f2') },
      { id: 'f2', role: 'two', at: 1, label: 'adds JSON input', session: 'new', pass: tree('CSV and JSON pass', 'f3') },
      { id: 'f3', role: 'one', at: 2, label: 'adds XML input', session: 'new', pass: tree('XML encoding breaks', 'f4') },
      { id: 'f4', role: 'two', at: 3, label: 'fixes XML encoding', session: 'new', pass: tree('all but .xlsx', 'f5') },
      { id: 'f5', role: 'one', at: 4, label: 'adds .xlsx', session: 'new' },
    ],
    loop: { from: 'f5', to: 'f1', said: 'a round is a turn each' },
    ends: [BUDGET, { is: 'fail', said: 'a turn fails' }],
    caption:
      'Neither is told what the other said: what passes between them is the working directory. A turn that fails ends the run, and --resume picks up with the chaser whose turn was next.',
  },

  // Three turns, the last cut short by the exploration deadline; the reviewer is then the agent
  // that did not write the latest accepted candidate, which here is second_chaser.
  fixed_interrupt_flame_chase: {
    of: 'flame_chasoid:fixed_interrupt',
    beat: 146,
    envs: [
      { id: 'ws', name: 'one shared workspace' },
      { id: 'trusted', name: 'outside it: the trusted evaluator' },
    ],
    roles: [
      { id: 'one', name: 'first_chaser', note: 'a new session a turn', kind: 'maker', env: 'ws' },
      { id: 'two', name: 'second_chaser', note: 'a new session a turn', kind: 'partner', env: 'ws' },
      { id: 'gate', name: 'evaluator', note: 'counts accepted, no model', kind: 'program', env: 'trusted' },
    ],
    turns: [
      { id: 'f1', role: 'one', at: 0, label: 'experiments', session: 'new', inside: 5, pass: tree('5 accepted', 'g1') },
      { id: 'g1', role: 'gate', at: 1, label: 'k = 5: closed', session: 'none', pass: tree('the workspace', 'f2') },
      { id: 'f2', role: 'two', at: 2, label: 'experiments', session: 'new', inside: 5, pass: tree('5 accepted', 'g2') },
      { id: 'g2', role: 'gate', at: 3, label: 'k = 5: closed', session: 'none', pass: tree('the workspace', 'f3') },
      { id: 'f3', role: 'one', at: 4, label: 'experiments', session: 'new', inside: 3, pass: tree('3 accepted', 'g3') },
      { id: 'g3', role: 'gate', at: 5, label: 'stops counting', session: 'none', pass: tree('13 candidates', 'r') },
      {
        id: 'r',
        role: 'two',
        at: 7,
        label: 'blind review',
        session: 'new',
        does: 'read',
        pass: text('picks an older one', 'end'),
      },
    ],
    loop: { from: 'g3', to: 'f1', said: 'alternating, until only the review reserve is left' },
    ends: [
      { is: 'done', said: 'the review settles the final candidate' },
      { is: 'fail', said: 'a provider or the evaluator fails' },
      BUDGET,
    ],
    caption:
      'Each turn is a fresh session, closed the moment the evaluator has counted k accepted experiments — a number the agents are never told. At the deadline the agent that did not write the latest accepted candidate reviews them all blind, and may pick an older one.',
  },

  // The epoch hands the first cleaning back once, for a NEXT.md over `next_lines`, before it
  // checks the tree and makes it one commit.
  ralph_loop_agent_cleanup: {
    of: 'flame_chasoid:agent_cleanup_ralph_loop',
    beat: 146,
    envs: [{ id: 'repo', name: 'your repository — its history rewritten every epoch' }],
    roles: [
      { id: 'agent', name: 'agent', note: 'a new session a turn', kind: 'maker', env: 'repo' },
      { id: 'cleaner', name: 'cleaner', note: 'a new session an epoch', kind: 'steward', env: 'repo' },
      { id: 'epoch', name: 'the epoch', note: 'Humanize, no model', kind: 'program', env: 'repo' },
    ],
    turns: [
      { id: 't1', role: 'agent', at: 0, label: 'fixes imports', session: 'new', pass: tree('src/ and scratch', 't2') },
      { id: 't2', role: 'agent', at: 1, label: 'fixes the parser', session: 'new', pass: tree('the tree', 't3') },
      { id: 't3', role: 'agent', at: 2, label: 'fixes fixtures', session: 'new', pass: tree('three turns of work', 'e1') },
      {
        id: 'e1',
        role: 'cleaner',
        at: 3,
        label: 'distills the tree',
        session: 'new',
        does: 'plan',
        pass: tree('the distilled tree', 'm1'),
      },
      {
        id: 'm1',
        role: 'epoch',
        at: 4,
        label: 'too much: repair',
        session: 'none',
        pass: text('NEXT.md over 10 lines', 'e2'),
      },
      { id: 'e2', role: 'cleaner', at: 5, label: 'trims NEXT.md', session: 'held', does: 'plan', pass: tree('the tree, trimmed', 'm2') },
      {
        id: 'm2',
        role: 'epoch',
        at: 6,
        label: 'checks, one commit',
        session: 'none',
        pass: tree('src/ and NEXT.md', 't4'),
      },
      { id: 't4', role: 'agent', at: 7, label: 'starts from NEXT.md', session: 'new' },
    ],
    loop: { from: 't4', to: 't2', said: 'an epoch every cleanup_turns turns' },
    ends: [BUDGET, { is: 'fail', said: '3 turns in a row come to nothing' }],
    caption:
      'Every few turns the cleaner keeps the work under work_paths, deletes what strayed and writes NEXT.md. A cleaning that left too much goes back to the same cleaner; then Humanize checks the result, and the history becomes one commit. An empty or failed turn is taken again.',
  },

  // A turn that comes to nothing is taken again by the same chaser, not passed to the other.
  flame_chase_agent_cleanup: {
    of: 'flame_chasoid:agent_cleanup_flame_chase',
    beat: 146,
    envs: [{ id: 'repo', name: 'your repository — its history rewritten every epoch' }],
    roles: [
      { id: 'one', name: 'first_chaser', note: 'a new session a turn', kind: 'maker', env: 'repo' },
      { id: 'two', name: 'second_chaser', note: 'a new session a turn', kind: 'partner', env: 'repo' },
      { id: 'cleaner', name: 'cleaner', note: 'a new session an epoch', kind: 'steward', env: 'repo' },
      { id: 'epoch', name: 'the epoch', note: 'Humanize, no model', kind: 'program', env: 'repo' },
    ],
    turns: [
      { id: 'f1', role: 'one', at: 0, label: 'fixes imports', session: 'new', pass: tree('the tree', 'f2') },
      { id: 'f2', role: 'two', at: 1, label: 'fixes the parser', session: 'new', pass: tree('the tree', 'f3') },
      { id: 'f3', role: 'one', at: 2, label: 'fixes fixtures', session: 'new', pass: tree('three turns of work', 'e1') },
      {
        id: 'e1',
        role: 'cleaner',
        at: 3,
        label: 'distills the tree',
        session: 'new',
        does: 'plan',
        pass: tree('the distilled tree', 'm1'),
      },
      {
        id: 'm1',
        role: 'epoch',
        at: 4,
        label: 'checks, one commit',
        session: 'none',
        pass: tree('src/ and NEXT.md', 'f4'),
      },
      { id: 'f4', role: 'two', at: 5, label: 'comes to nothing', session: 'new', pass: tree('the tree, as it was', 'f5') },
      { id: 'f5', role: 'two', at: 6, label: 'takes it again', session: 'new', pass: tree('the tree', 'f6') },
      { id: 'f6', role: 'one', at: 7, label: 'fixes the last 3', session: 'new' },
    ],
    loop: { from: 'f6', to: 'f2', said: 'the seats keep alternating across epochs' },
    ends: [BUDGET, { is: 'fail', said: '3 turns in a row come to nothing' }],
    caption:
      'The chasers alternate straight across the cleaning, so after three turns second_chaser opens the next stretch. When its turn comes to nothing, it is second_chaser that takes it again, not the other.',
  },

  // The second review catches a test stubbed to pass, which is what a reviewer that never saw
  // the work being done is there to catch.
  rlar: {
    of: 'rlar',
    envs: [{ id: 'repo', name: 'your repository' }],
    roles: [
      { id: 'actor', name: 'actor', note: 'one session, remembers', kind: 'maker', env: 'repo' },
      { id: 'reviewer', name: 'reviewer', note: 'a new session a review', kind: 'checker', env: 'repo' },
    ],
    turns: [
      { id: 'a1', role: 'actor', at: 0, label: 'adds an undo stack', session: 'new', pass: tree('undo, no redo', 'v1') },
      {
        id: 'v1',
        role: 'reviewer',
        at: 1,
        label: 'reads the repo',
        session: 'new',
        does: 'read',
        pass: text('false: no redo', 'a2'),
      },
      { id: 'a2', role: 'actor', at: 2, label: 'adds redo', session: 'held', pass: tree('undo and redo', 'v2') },
      {
        id: 'v2',
        role: 'reviewer',
        at: 3,
        label: 'reads it fresh',
        session: 'new',
        does: 'read',
        pass: text('false: a stubbed test', 'a3'),
      },
      { id: 'a3', role: 'actor', at: 4, label: 'writes a real test', session: 'held', pass: tree('a real test', 'v3') },
      {
        id: 'v3',
        role: 'reviewer',
        at: 5,
        label: 'reads it fresh',
        session: 'new',
        does: 'read',
        pass: text('done: true', 'end'),
      },
    ],
    loop: { from: 'v3', to: 'a2', said: 'while the review says there is more to do' },
    ends: [
      { is: 'done', said: 'the reviewer says done' },
      { is: 'fail', said: 'a turn fails' },
      BUDGET,
    ],
    caption:
      'Every review answers two things: whether the task is done, and what the actor hears next. The actor remembers every round; each review starts from nothing but the task, what the actor said and the repository.',
  },

  'humanize1-gen-idea': {
    of: 'humanize1:gen-idea',
    envs: [{ id: 'repo', name: 'your repository' }],
    roles: [{ id: 'drafter', name: 'drafter', note: 'one session', kind: 'maker', env: 'repo' }],
    turns: [
      {
        id: 'i1',
        role: 'drafter',
        at: 0,
        span: 3,
        label: 'undo and redo: 6 directions',
        session: 'new',
        does: 'plan',
        inside: 6,
        pass: tree('ideas/undo-redo.md', 'end'),
      },
    ],
    ends: [{ is: 'done', said: 'the draft is written' }, BUDGET],
    caption:
      'One turn, one file: a main direction and the rest as alternatives, and no code. The ticks are the six directions, each explored against the repository by a read-only helper inside the drafter’s own turn.',
  },

  // The analyst objects once and agrees the second time, each time in a session of its own.
  'humanize1-gen-plan': {
    of: 'humanize1:gen-plan',
    beat: 146,
    envs: [{ id: 'repo', name: 'your repository' }],
    roles: [
      { id: 'planner', name: 'planner', note: 'one session throughout', kind: 'maker', env: 'repo' },
      { id: 'analyst', name: 'analyst', note: 'a new session a reading', kind: 'checker', env: 'repo' },
    ],
    turns: [
      {
        id: 'n0',
        role: 'analyst',
        at: 0,
        label: 'about this repo?',
        session: 'new',
        does: 'read',
        pass: text('yes: src/editor', 'n1'),
      },
      {
        id: 'n1',
        role: 'analyst',
        at: 1,
        label: 'lists the risks',
        session: 'new',
        does: 'read',
        pass: text('3 risks', 'p1'),
      },
      { id: 'p1', role: 'planner', at: 2, label: 'writes the plan', session: 'new', does: 'plan', pass: tree('docs/plan.md', 'n2') },
      {
        id: 'n2',
        role: 'analyst',
        at: 3,
        label: 'reviews the plan',
        session: 'new',
        does: 'read',
        pass: text('2 objections', 'p2'),
      },
      { id: 'p2', role: 'planner', at: 4, label: 'revises it', session: 'held', does: 'plan', pass: tree('the plan, revised', 'n3') },
      {
        id: 'n3',
        role: 'analyst',
        at: 5,
        label: 'reviews it fresh',
        session: 'new',
        does: 'read',
        pass: text('agreed', 'p3'),
      },
      { id: 'p3', role: 'planner', at: 6, label: 'finalizes it', session: 'held', does: 'plan', pass: tree('docs/plan.md', 'end') },
    ],
    loop: { from: 'p2', to: 'n2', said: 'up to 3 rounds, until the two agree' },
    ends: [
      { is: 'done', said: 'the plan is written' },
      { is: 'fail', said: 'the draft is not about this repository' },
      { is: 'fail', said: 'a decision is left PENDING' },
      BUDGET,
    ],
    caption:
      'The side that writes remembers and the side that reads does not — the rule all of humanize1 is built on.',
  },

  // A round of findings, then a round the reviewer calls COMPLETE, then the code review of the
  // whole change that the loop also has to come through clean.
  'humanize1-rlcr': {
    of: 'humanize1:rlcr',
    beat: 146,
    envs: [{ id: 'repo', name: 'your git repository' }],
    roles: [
      { id: 'you', name: 'you', note: 'asked only when you are there', kind: 'human' },
      { id: 'builder', name: 'builder', note: 'one session, the loop', kind: 'maker', env: 'repo' },
      { id: 'gates', name: 'the gates', note: 'Humanize, no model', kind: 'program', env: 'repo' },
      { id: 'reviewer', name: 'reviewer', note: 'a new session a review', kind: 'checker', env: 'repo' },
    ],
    turns: [
      { id: 'q', role: 'you', at: 0, label: '2 questions on the plan', session: 'none', pass: text('answered, or skipped', 'b1') },
      { id: 'b1', role: 'builder', at: 1, label: 'builds undo/redo', session: 'new', pass: tree('believes it is done', 'g1') },
      { id: 'g1', role: 'gates', at: 2, label: '15 stop checks', session: 'none', pass: text('passed', 'v1') },
      {
        id: 'v1',
        role: 'reviewer',
        at: 3,
        label: 'reviews round 1',
        session: 'new',
        does: 'read',
        pass: text('[P1] redo after edit', 'b2'),
      },
      { id: 'b2', role: 'builder', at: 4, label: 'fixes the [P1]', session: 'held', pass: tree('believes it is done', 'g2') },
      { id: 'g2', role: 'gates', at: 5, label: '15 stop checks', session: 'none', pass: text('passed', 'v2') },
      {
        id: 'v2',
        role: 'reviewer',
        at: 6,
        label: 'says COMPLETE',
        session: 'new',
        does: 'read',
        pass: text('nothing left', 'v3'),
      },
      {
        id: 'v3',
        role: 'reviewer',
        at: 7,
        label: 'code review',
        session: 'new',
        does: 'read',
        pass: text('clean', 'end'),
      },
    ],
    loop: { from: 'v3', to: 'b2', said: 'a refused check or a finding is the builder’s next prompt' },
    ends: [
      { is: 'done', said: 'complete: nothing left, code review clean' },
      { is: 'fail', said: 'max rounds, or stop' },
      BUDGET,
    ],
    caption:
      'The builder works until it believes the whole plan is done; the round’s checks run, and what the reviewer finds is what the builder hears next, in the same session. Once the reviewer finds nothing left, a code review of the whole change has to come back clean too.',
  },

  // The gates refuse the first draft, which never ends in the world whose agent never says it
  // is done; the refusal goes back word for word, and the repaired draft passes both checks.
  aot: {
    of: 'aot',
    beat: 150,
    envs: [
      { id: 'scratch', name: 'a scratch directory' },
      { id: 'fakes', name: 'three fake worlds' },
    ],
    roles: [
      { id: 'writer', name: 'writer', note: 'one session throughout', kind: 'maker', env: 'scratch' },
      { id: 'critic', name: 'critic', note: 'a new session, reads only', kind: 'checker', env: 'scratch' },
      { id: 'gates', name: 'the gates', note: 'Humanize, no model', kind: 'program', env: 'fakes' },
    ],
    turns: [
      { id: 'w1', role: 'writer', at: 0, label: 'draws up a spec', session: 'new', does: 'plan' },
      { id: 'w2', role: 'writer', at: 1, label: 'drafts the flow', session: 'held', pass: tree('the draft', 'g1') },
      {
        id: 'g1',
        role: 'gates',
        at: 2,
        label: 'runs it on fakes',
        session: 'none',
        pass: text('never ends in world 1', 'w3'),
      },
      { id: 'w3', role: 'writer', at: 3, label: 'adds max rounds', session: 'held', pass: tree('the draft, repaired', 'g2') },
      {
        id: 'g2',
        role: 'gates',
        at: 4,
        label: 'runs it on fakes',
        session: 'none',
        pass: text('ends in all three', 'c1'),
      },
      {
        id: 'c1',
        role: 'critic',
        at: 5,
        label: 'reads it fresh',
        session: 'new',
        does: 'read',
        pass: text('approved: it lands', 'end'),
      },
    ],
    loop: { from: 'c1', to: 'w3', said: 'a refusal goes back word for word, up to repairs times' },
    ends: [
      { is: 'done', said: 'approved: the flow lands' },
      { is: 'fail', said: 'repairs run out, and you say no' },
      BUDGET,
    ],
    caption:
      'A draft lands only once Humanize has loaded it, it has ended on its own in three fake worlds, and a critic that never saw it written approves it. A refusal at any of them goes back to the writer, word for word.',
  },

  // Lane 3 fails twice in a row and is held until the objective is replanned, while the other
  // two lanes go on.
  parallel_flame_chase: {
    of: 'flame_chasoid:parallel',
    depth: 'lanes',
    envs: [
      { id: 'plan', name: 'a planning snapshot' },
      { id: 'l1', name: 'lane 1 · your tree', stack: 0 },
      { id: 'l2', name: 'lane 2 · a private copy', stack: 1 },
      { id: 'l3', name: 'lane 3 · a private copy', stack: 2 },
    ],
    roles: [
      { id: 'co', name: 'coordinator', note: 'plans once, then leaves', kind: 'steward', env: 'plan' },
      { id: 'l1a', name: 'lane_1_actor_a', note: 'the sole writer', kind: 'maker', env: 'l1' },
      { id: 'l1b', name: 'lane_1_actor_b', note: 'the sole writer', kind: 'partner', env: 'l1' },
      { id: 'l2a', name: 'lane_2_actor_a', note: 'on a copy', kind: 'maker', env: 'l2' },
      { id: 'l2b', name: 'lane_2_actor_b', note: 'on a copy', kind: 'partner', env: 'l2' },
      { id: 'l3a', name: 'lane_3_actor_a', note: 'on a copy', kind: 'maker', env: 'l3' },
      { id: 'l3b', name: 'lane_3_actor_b', note: 'on a copy', kind: 'partner', env: 'l3' },
    ],
    turns: [
      {
        id: 'c0',
        role: 'co',
        at: 0,
        label: 'plans three lanes',
        session: 'new',
        does: 'plan',
        pass: [
          { to: 'x1', said: 'lane 1: hot loops', via: 'text' },
          { to: 'y1', said: 'lane 2: presolve', via: 'text' },
          { to: 'z1', said: 'lane 3: heuristics', via: 'text' },
        ],
      },
      { id: 'x1', role: 'l1a', at: 1, label: 'profiles bench/', session: 'new', pass: tree('the tree', 'x2') },
      { id: 'y1', role: 'l2a', at: 1, label: 'tries a presolve', session: 'new', pass: tree('the copy', 'y2') },
      { id: 'z1', role: 'l3a', at: 1, label: 'the turn fails', session: 'new', pass: tree('the copy', 'z2') },
      { id: 'x2', role: 'l1b', at: 2, label: 'fixes a hot loop', session: 'new', pass: tree('the tree', 'x3') },
      {
        id: 'y2',
        role: 'l2b',
        at: 2,
        label: 'presolve: 2× faster',
        session: 'new',
        pass: [
          { to: 'y3', said: 'the copy', via: 'tree' },
          { to: 'x3', said: 'a report, an artifact', via: 'text' },
        ],
      },
      { id: 'z2', role: 'l3b', at: 2, label: 'fails again: held', session: 'new' },
      { id: 'x3', role: 'l1a', at: 3, label: 'applies the report', session: 'new' },
      { id: 'y3', role: 'l2a', at: 3, label: 'tunes the presolve', session: 'new' },
    ],
    loop: { from: 'x3', to: 'x1', said: 'each lane alternates a and b, until two failures in a row hold it' },
    ends: [BUDGET, { is: 'you', said: 'you stop it' }],
    caption:
      'Three lanes at once, and only lane 1 writes your tree: what lane 2 finds reaches it as a report and an artifact, never as a write. Lane 3 fails twice in a row and is held until the objective is replanned; the others go on.',
  },

  // Lanes 2 and 3 both measure a pull request; only the better receipt is merged, and every
  // lane hears what was merged and what was refused.
  parallel_flame_chase_git_pr: {
    of: 'flame_chasoid:parallel_git_pr',
    depth: 'lanes',
    beat: 150,
    envs: [
      { id: 'plan', name: 'a planning workspace' },
      { id: 'l1', name: 'lane 1 · a clone', stack: 0 },
      { id: 'l2', name: 'lane 2 · a clone', stack: 1 },
      { id: 'l3', name: 'lane 3 · a clone', stack: 2 },
      { id: 'main', name: 'the central repository' },
    ],
    roles: [
      { id: 'co', name: 'orchestrator', note: 'plans once', kind: 'steward', env: 'plan' },
      { id: 'l1a', name: 'lane_1_actor_a', note: 'in its clone', kind: 'maker', env: 'l1' },
      { id: 'l1b', name: 'lane_1_actor_b', note: 'in its clone', kind: 'partner', env: 'l1' },
      { id: 'l2a', name: 'lane_2_actor_a', note: 'in its clone', kind: 'maker', env: 'l2' },
      { id: 'l2b', name: 'lane_2_actor_b', note: 'in its clone', kind: 'partner', env: 'l2' },
      { id: 'l3a', name: 'lane_3_actor_a', note: 'in its clone', kind: 'maker', env: 'l3' },
      { id: 'l3b', name: 'lane_3_actor_b', note: 'in its clone', kind: 'partner', env: 'l3' },
      { id: 'main', name: 'main', note: 'Humanize, no model', kind: 'program', env: 'main' },
    ],
    turns: [
      {
        id: 'c0',
        role: 'co',
        at: 0,
        label: 'plans three lanes',
        session: 'new',
        does: 'plan',
        pass: [
          { to: 'x1', said: 'lane 1: hot loops', via: 'text' },
          { to: 'y1', said: 'lane 2: presolve', via: 'text' },
          { to: 'z1', said: 'lane 3: heuristics', via: 'text' },
        ],
      },
      { id: 'x1', role: 'l1a', at: 1, label: 'profiles bench/', session: 'new', pass: tree('the clone', 'x2') },
      { id: 'y1', role: 'l2a', at: 1, label: 'tries a presolve', session: 'new', pass: tree('the clone', 'y2') },
      { id: 'z1', role: 'l3a', at: 1, label: 'a new heuristic', session: 'new', pass: tree('the clone', 'z2') },
      { id: 'x2', role: 'l1b', at: 2, label: 'keeps a draft', session: 'new' },
      { id: 'y2', role: 'l2b', at: 2, label: 'receipt: 7.9 s', session: 'new', pass: tree('a PR and receipt', 'm') },
      { id: 'z2', role: 'l3b', at: 2, label: 'receipt: 9.4 s', session: 'new', pass: tree('a PR and receipt', 'm') },
      {
        id: 'm',
        role: 'main',
        at: 3,
        label: '7.9 s beats main',
        session: 'none',
        pass: [
          { to: 'x3', said: 'lane 2 merged', via: 'text' },
          { to: 'y3', said: 'merged', via: 'text' },
          { to: 'z3', said: 'lane 3 refused', via: 'text' },
        ],
      },
      { id: 'x3', role: 'l1a', at: 4, label: 'on the new main', session: 'new' },
      { id: 'y3', role: 'l2a', at: 4, label: 'on the new main', session: 'new' },
      { id: 'z3', role: 'l3a', at: 4, label: 'on the new main', session: 'new' },
    ],
    loop: { from: 'x3', to: 'x1', said: 'each lane alternates a and b; main moves only for a measured improvement' },
    ends: [BUDGET, { is: 'you', said: 'you stop it' }],
    caption:
      'No reviewer: two lanes measure a pull request with pfc evaluate, and only the best receipt that beats main is merged. The repository refuses any main that is not the tree that was measured.',
  },

  // The prose proof is turned down once, at its first invalid step, before it holds; then the
  // lemma splits, and is formalized once its children are proved.
  recursive_lean_prover: {
    of: 'recursive_lean_prover',
    beat: 140,
    envs: [
      { id: 'repo', name: 'your Lean repository' },
      { id: 'wt', name: 'the lemma’s own worktree' },
    ],
    roles: [
      { id: 'worker', name: 'worker', note: 'a new session a turn', kind: 'maker', env: 'repo' },
      { id: 'reviewer', name: 'reviewer', note: 'a new session a turn', kind: 'checker', env: 'repo' },
      { id: 'lean', name: 'worker, as builder', note: 'rlcr, in the worktree', kind: 'maker', env: 'wt' },
      { id: 'check', name: 'comparator', note: 'your script, no model', kind: 'program', env: 'wt' },
    ],
    turns: [
      { id: 'p', role: 'worker', at: 0, label: 'one plan', session: 'new', does: 'plan', calls: 'humanize1:gen-plan' },
      { id: 'n1', role: 'worker', at: 1, label: 'proof in prose', session: 'new', pass: text('the proof', 'r1') },
      {
        id: 'r1',
        role: 'reviewer',
        at: 2,
        label: 'audits each step',
        session: 'new',
        does: 'read',
        pass: text('invalid at step 3', 'n2'),
      },
      { id: 'n2', role: 'worker', at: 3, label: 'revises step 3', session: 'new', pass: text('the proof, revised', 'r2') },
      {
        id: 'r2',
        role: 'reviewer',
        at: 4,
        label: 'audits it again',
        session: 'new',
        does: 'read',
        pass: text('valid', 'd'),
      },
      {
        id: 'd',
        role: 'worker',
        at: 5,
        label: 'splits it in two',
        session: 'new',
        does: 'plan',
        pass: text('children proved', 'f'),
      },
      {
        id: 'f',
        role: 'lean',
        at: 8,
        label: 'Lean, on a branch',
        session: 'new',
        calls: 'humanize1:rlcr',
        pass: tree('the candidate', 'c'),
      },
      { id: 'c', role: 'check', at: 9, label: 'comparator passes', session: 'none', pass: tree('the same candidate', 'a') },
      {
        id: 'a',
        role: 'reviewer',
        at: 10,
        label: 'reruns it: accepted',
        session: 'new',
        does: 'read',
        pass: text('into the wiki', 'end'),
      },
    ],
    split: { at: 'd', into: 2, said: 'each lemma runs this same line, at once' },
    ends: [
      { is: 'done', said: 'the root theorem is proved' },
      { is: 'fail', said: 'the root theorem is refused' },
      BUDGET,
    ],
    caption:
      'One lemma of the proof. Its prose proof is revised from the reviewer’s first invalid step until it holds; then it splits, and each child lemma runs this same line a level down, at once. Once they are proved it is formalized, and accepted into the wiki.',
  },
}
