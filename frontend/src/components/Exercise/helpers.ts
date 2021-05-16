import { ExerciseType } from 'constants/lesson';
import { TypeLessonWord } from 'types';
import { getRandomItem } from 'helpers/array';
import { TypeWordForChoosing } from './types';

export function getWordsForChoosing(
  currentWord: TypeLessonWord,
  words: TypeLessonWord[],
  exerciseType: ExerciseType,
): TypeWordForChoosing[] {
  if (exerciseType === ExerciseType.ENG_RUS) {
    const wordsForChoosing = [currentWord.russian_wording];
    const allWordsRussian = words
      .filter((word) => word.russian_wording !== currentWord.russian_wording)
      .map((word) => word.russian_wording);

    while (wordsForChoosing.length !== 4) {
      const randomWord = getRandomItem(allWordsRussian);

      if (!wordsForChoosing.includes(randomWord)) {
        wordsForChoosing.push(randomWord);
      }
    }

    return wordsForChoosing.map((word) => ({
      word,
      isRight: word === currentWord.russian_wording,
    }));
  }

  if (exerciseType === ExerciseType.RUS_ENG) {
    const wordsForChoosing = [currentWord.english_wording];
    const allWordsEnglish = words
      .filter((word) => word.english_wording !== currentWord.english_wording)
      .map((word) => word.english_wording);

    while (wordsForChoosing.length !== 4) {
      const randomWord = getRandomItem(allWordsEnglish);

      if (!wordsForChoosing.includes(randomWord)) {
        wordsForChoosing.push(randomWord);
      }
    }

    return wordsForChoosing.map((word) => ({
      word,
      isRight: word === currentWord.english_wording,
    }));
  }

  throw new Error('Cant get words for choosing!');
}
