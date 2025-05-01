<script setup lang="ts">
import { useHangman } from '../composables/useHangman'

const { word, hint, errors, correct, fetchWord, guessLetter, guesses, usedWords, gameState, correctLetters } = useHangman()

const letter = ref<string>("")
const state = useLocalStorage('used-words', usedWords.value)

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
  fetchWord()
  correctLetters.value = new Set(word.value?.split(''))
}

function handleGuess() {
  guessLetter(letter.value)
  letter.value = ""
}
</script>

<template>
  <div>
    <NuxtRouteAnnouncer />
    <div v-if="gameState === 'lost'">
      WHOMP WHOMP! The word was {{ word }}
      <button @click="handlePlayAgain">Play Again</button>
    </div>
    <div v-if="gameState === 'won'">
      LETS GOOOOOO
      <button @click="handlePlayAgain">Play Again</button>
    </div>
    <div>
      <p>Hint: {{ hint }}</p>
      <button @click="fetchWord()">Fetch new word</button>
    </div>
    <div class="guess">
      input: <input v-model="letter" @keydown.enter="handleGuess" />
      <button @click="handleGuess">Guess</button>
    </div>
    <div class="">
      display: <span v-for="(letter, i) in guesses" :key="i">{{ !word?.includes(letter) ? letter : '' }}</span>
    </div>

    <div class="word">
      <div class="letter" v-for="(letter, i) in word" :key="i">{{ guesses.includes(letter) ? letter : '' }}</div>
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
}

.letter {
  border: 1px solid black;
  height: 3rem;
  width: 3rem;
  font-size: 1.5rem;
  display: grid;
  place-items: center;
}
</style>
