<script setup lang="ts">
const isDark = useDark({
  attribute: 'class',
  valueDark: 'dark',
  valueLight: 'light',
})
const colorMode = useColorMode({

  modes:{
    dark: 'dark',
    light: 'light'
  },
  attribute: 'class',
})
const toggleDark = useToggle(isDark)
const themeState = useLocalStorage('vueuse-color-scheme', isDark ? 'dark' : 'light')

const useToggleDark = () =>{
  themeState.value = isDark.value ? 'dark' : 'light'
  toggleDark()
  colorMode.value = isDark.value ? 'dark' : 'light'
}

const { guessWord, remainingGuesses, score, word, hint, errors, correct, fetchWord, guessLetter, guesses, usedWords, gameState, correctLetters } = useHangman()

const letter = ref<string>("")
const state = useLocalStorage('used-words', [])

console.log(gameState.value)

onMounted(() => {
  usedWords.value = state.value
  guesses.value = []
  fetchWord()
  correctLetters.value = new Set(word.value?.split(''))
})


function handlePlayAgain() {
  gameState.value = 'playing'
  letter.value = ""
  guesses.value = []
  correct.value = 0
  errors.value = 0
  guesses.value = []
  fetchWord()
  correctLetters.value = new Set(word.value?.split(''))
}

function showWord() {
  gameState.value = 'lost'
  console.log(word.value)
}

function handleGuess() {
  guessLetter(letter.value)
  letter.value = ""
}

const guess = ref("")

function handleGuessWord() {
  guessWord(guess)
  guess.value = ""
}

useHead({
  title: 'Hangman',
  meta: [
    { name: 'description', content: 'My amazing site.' }
  ],
  script: [ `

    if (localStorage.getItem('vueuse-color-scheme') === "dark" || (!('vueuse-color-scheme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      document.documentElement.setAttribute('class', "dark")
    } else if (localStorage.getItem('vueuse-color-scheme') === "light" ) {
      document.documentElement.setAttribute('class', "light")
    } 

    ` ]
  
})
</script>


<template>
<div>
    <NuxtRouteAnnouncer />
    <header>
      <h1>Hangman</h1>
      <button @click="useToggleDark()">
      Is Dark: {{ isDark }}
    </button>
    </header>
    <div class="min-h-screen">
      <div>Score: <span>{{ score }}</span> </div>
      <div>Remaining Guesses: <span>{{ remainingGuesses }}</span> </div>
      <div class="h-full">
       <div>
        <p class="">Hint: </p>
        <p>{{ hint }}</p>
       </div>
        <div v-if="gameState === 'lost'">
          WHOMP WHOMP! The word was {{ word }}
          <button @click="handlePlayAgain()">Play Again</button>
        </div>
        <div v-if="gameState === 'won'">
          LETS GOOOOOO: The Word is {{ word }}
          <button @click="handlePlayAgain()">Play Again</button>
        </div>
        <!-- <div>
          <p class="text-5xl">Hint: {{ hint }}</p>
          <UButton @click="fetchWord()">Fetch new word</UButton>
        </div> -->
        <!-- <div class="guess">
          <UInput maxlength="1" v-model="letter" @keydown.enter="handleGuess" />
          <UButton @click="handleGuess">Guess</UButton>
        </div> -->
        <!-- <div class="">
         <span v-for="(letter, i) in guesses" :key="i">{{ !word?.includes(letter) ? letter : '' }}</span>
        </div> -->

        <div class="word">
          <div class="letter" v-for="(letter, i) in word" :key="i">{{ guesses.includes(letter) ? letter : '' }}</div>    
        </div>
        {{ guess }}
        <form @submit.prevent="handleGuessWord">
          <input type="text" v-model.trim="guess" />
          <button>Guess Word</button>
        </form>
        

        <Keyboard />
        <button @click="showWord">Show Word</button>
      </div>
  </div>
</div>
</template>

<style>
.guess {
  margin-bottom: 1rem;
}

.word {
  display: flex;
  gap: .5rem;
  margin-bottom: 2rem;
  justify-content: center;
}

.letter {
  border-bottom: 1px solid black;
  height: 1.25rem;
  width: 1.25rem;
  font-size: 1rem;
  display: grid;
  place-items: center;
}
</style>
