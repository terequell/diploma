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
    const wordsForChoosing = [
      { id: currentWord.id, text: currentWord.russian_wording },
    ];
    const allWordsRussian = words
      .filter((word) => word.id !== currentWord.id)
      .map((word) => ({ id: word.id, text: word.russian_wording }));

    while (wordsForChoosing.length !== 4) {
      const randomWord = getRandomItem(allWordsRussian);

      const wordAlreadyForChoosing = wordsForChoosing.find(
        (word) => word.id === randomWord.id,
      );

      if (!wordAlreadyForChoosing) {
        wordsForChoosing.push(randomWord);
      }
    }

    return wordsForChoosing.map((word) => ({
      id: word.id,
      text: word.text,
      isRight: word.id === currentWord.id,
    }));
  }

  if (exerciseType === ExerciseType.RUS_ENG) {
    const wordsForChoosing = [
      { id: currentWord.id, text: currentWord.english_wording },
    ];
    const allWordsEnglish = words
      .filter((word) => word.id !== currentWord.id)
      .map((word) => ({ id: word.id, text: word.english_wording }));

    while (wordsForChoosing.length !== 4) {
      const randomWord = getRandomItem(allWordsEnglish);

      const wordAlreadyForChoosing = wordsForChoosing.find(
        (word) => word.id === randomWord.id,
      );

      if (!wordAlreadyForChoosing) {
        wordsForChoosing.push(randomWord);
      }
    }

    return wordsForChoosing.map((word) => ({
      id: word.id,
      text: word.text,
      isRight: word.id === currentWord.id,
    }));
  }

  throw new Error('Cant get words for choosing!');
}
