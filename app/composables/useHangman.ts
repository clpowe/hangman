import data from '../assets/words.json';

type WORD = {
  word: string;
  definition: string;
  usage: {
    sentence: string;
    source: string;
  };
};

export const useHangman = () => {
  const usedWords = useState<string[]>('usedWords', () => []);
  const word = useState<string | undefined>('word', () => undefined);
  const hint = useState<string | undefined>('hint', () => undefined);
  const guesses = useState<string[]>('guesses', () => []);
  const errors = useState('error', () => 0);
  const correct = useState('correct', () => 0);
  const score = useState('score', () => 0);
  let correctLetters = useState('correctLetters', () => new Set())
  const state = useLocalStorage('used-words', usedWords.value)
  function selectWord(){
    try {
      const randomIndex = Math.floor(Math.random() * data.length);
      return data[randomIndex];
    } catch (error) {
      console.log(error)
    }
  }

  const fetchWord = async () => {
    
    let fetchedData: WORD | undefined = undefined;

    fetchedData = selectWord()
    if(usedWords.value.length === data.length){

      state.value = []
    }
    if(usedWords.value.includes(fetchedData?.word!)){
      return fetchWord()
    }

    // fetchedData = await $fetch<WORD>('/api/generate-word', {
    //   method: 'POST',
    //   body: JSON.stringify(usedWords.value),
    // });

    // if (!fetchedData) return;

    word.value = fetchedData?.word.toLowerCase();
    hint.value = fetchedData?.definition;
    correctLetters.value = new Set(word.value?.split(''))
    usedWords.value.push(word.value!);
    console.log(usedWords.value);
  };

  const guessLetter = (letter: string) => {
    console.log(letter)
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
      score.value++
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

  return { score, word, hint, correct, guesses, errors, fetchWord, guessLetter, usedWords, gameState, correctLetters };
};

