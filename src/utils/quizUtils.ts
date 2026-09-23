import { Question, QuestionOption, RegionId } from '../types';
import { getQuestionsForRegion } from '../data/questionsData';

/**
 * Standard Fisher-Yates shuffle that returns a new randomized array.
 */
export function shuffleArray<T>(array: T[]): T[] {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

/**
 * Shuffles the 4 options of a question and updates the `correct` letter
 * so that the correct answer matches the new position ('A', 'B', 'C', or 'D').
 * Uses original ID tracking for 100% mathematical precision.
 */
export function shuffleQuestionOptions(question: Question): Question {
  const originalCorrectId = question.correct;

  // Tag with originalId
  const tagged = question.options.map((opt) => ({
    originalId: opt.id,
    text: opt.text,
  }));

  // Shuffle the options
  const shuffledTagged = shuffleArray(tagged);

  const letters: ('A' | 'B' | 'C' | 'D')[] = ['A', 'B', 'C', 'D'];
  let newCorrect: 'A' | 'B' | 'C' | 'D' = 'A';

  const newOptions: QuestionOption[] = shuffledTagged.map((opt, index) => {
    const letter = letters[index];
    if (opt.originalId === originalCorrectId) {
      newCorrect = letter;
    }
    return {
      id: letter,
      text: opt.text,
    };
  });

  return {
    ...question,
    options: newOptions,
    correct: newCorrect,
  };
}

/**
 * Prepares the 15 questions for a region with optional question-order shuffling
 * and option-order + correct-answer shuffling.
 */
export function getPreparedQuestions(
  regionId: RegionId,
  shouldShuffleQuestions: boolean = true,
  shouldShuffleOptions: boolean = true
): Question[] {
  const baseQuestions = getQuestionsForRegion(regionId);

  // 1. Shuffle question order if requested
  const questionPool = shouldShuffleQuestions
    ? shuffleArray(baseQuestions)
    : [...baseQuestions];

  // 2. Shuffle options & correct answer keys if requested, and clean question numbering
  return questionPool.map((q, index) => {
    const qWithProcessedOptions = shouldShuffleOptions
      ? shuffleQuestionOptions(q)
      : { ...q, options: q.options.map((o) => ({ ...o })) };

    return {
      ...qWithProcessedOptions,
      questionNumber: index + 1, // Display clean 1..15 numbering
    };
  });
}
