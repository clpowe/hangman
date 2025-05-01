type WORD = {
  word: string;
  hint: string;
};

export const useHangman = () => {
  const usedWords = useState<string[]>('usedWords', () => []);
  const word = useState<string | undefined>('word', () => undefined);
  const hint = useState<string | undefined>('hint', () => undefined);
  const guesses = useState<string[]>('guesses', () => []);
  const errors = useState('error', () => 0);
  const correct = useState('correct', () => 0);
  let correctLetters = useState('correctLetters', () => new Set())

  const fetchWord = async () => {
    let fetchedData: WORD | null = null;


    fetchedData = await $fetch<WORD>('/api/generate-word', {
      method: 'POST',
      body: JSON.stringify(usedWords.value),
    });

    if (!fetchedData) return;

    word.value = fetchedData.word.toLowerCase();
    hint.value = fetchedData.hint;
    correctLetters.value = new Set(word.value?.split(''))
    usedWords.value.push(word.value);
    console.log(usedWords.value);
  };

  const guessLetter = (letter: string) => {
    const lower = letter.toLowerCase();
    if (guesses.value.includes(lower)) {
      return;
    }
    guesses.value.push(lower);
    if (!word.value?.includes(lower)) { errors.value++; } else { correct.value++ }
  };

  const gameState = useState<'playing' | 'won' | 'lost'>('playing', () => 'playing')

  watch(correct, () => {
    if (correct.value === correctLetters.value.size) {
      gameState.value = 'won'
      correct.value = 0
      errors.value = 0
      console.log('WON')
    }
  })

  watch(errors, () => {
    if (errors.value === 5) {
      correct.value = 0
      errors.value = 0
      gameState.value = 'lost'
    }
  })

  return { word, hint, correct, guesses, errors, fetchWord, guessLetter, usedWords, gameState, correctLetters };
};

