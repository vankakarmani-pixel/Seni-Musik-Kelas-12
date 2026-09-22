export type GameMode = 'solo' | 'duel' | 'squad';

export type RegionId = 1 | 2 | 3 | 4;

export interface QuestionOption {
  id: 'A' | 'B' | 'C' | 'D';
  text: string;
}

export interface Question {
  id: number;
  regionId: RegionId;
  questionNumber: number;
  question: string;
  options: QuestionOption[];
  correct: 'A' | 'B' | 'C' | 'D';
  explanation: string;
}

export interface RegionSummaryCheatSheet {
  title: string;
  subtitle: string;
  keyPoints: string[];
  tableHeaders?: string[];
  tableRows?: string[][];
  importantTip?: string;
}

export interface PresentationSlide {
  id: string;
  tag: string;
  tagColor: string;
  title: string;
  subtitle: string;
  content: {
    type: 'bento' | 'comparison' | 'timeline' | 'cards' | 'diagram';
    cards?: {
      badge?: string;
      title: string;
      desc: string;
      iconEmoji?: string;
      color?: string;
    }[];
    comparisonData?: {
      col1Title: string;
      col2Title: string;
      col3Title?: string;
      rows: { label: string; val1: string; val2: string; val3?: string }[];
    };
    proTip?: string;
    highlightFact?: string;
  };
}

export interface RegionInfo {
  id: RegionId;
  name: string;
  subtitle: string;
  badgeColor: string;
  themeColor: string;
  monsterName: string;
  monsterTitle: string;
  monsterType: string;
  monsterColor: string;
  summary: RegionSummaryCheatSheet;
  slides: PresentationSlide[];
}

export interface MusicCharacter {
  id: string;
  name: string;
  species: string;
  tagline: string;
  role: string;
  personality: string;
  avatarColor: string;
  badgeBg: string;
  quoteWin: string;
  quoteLose: string;
}

export interface PlayerAnswerRecord {
  questionId: number;
  selected: 'A' | 'B' | 'C' | 'D' | 'TIMEOUT';
  isCorrect: boolean;
  scoreGained: number;
}

export interface PlayerState {
  id: number;
  name: string;
  colorName: string;
  characterId: string;
  score: number;
  monsterHp: number;
  maxMonsterHp: number;
  currentQIndex: number;
  timeLeft: number;
  maxTimePerQuestion: number;
  isLocked: boolean;
  selectedOption: 'A' | 'B' | 'C' | 'D' | null;
  lastSelectedCorrect: boolean | null;
  showExplanation: boolean;
  isTimeUp: boolean;
  isFinished: boolean;
  isDamaged: boolean;
  isShaking: boolean;
  showSlash: boolean;
  history: PlayerAnswerRecord[];
}

