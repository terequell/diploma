export type TypeUserInfo = {
  username: string;
  email: string;
  difficulty_level: number | null;
  dateRegistration: string;
  lessonsFinishedCount: number;
  wordsLearned: TypeWordLearned[];
};

export type TypeWordLearned = {
  russian_wording: string;
  english_wording: string;
  difficulty_level: number;
};
