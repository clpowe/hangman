<script setup lang="ts">

const {score, word, hint, errors, correct, fetchWord, guessLetter, guesses, usedWords, gameState, correctLetters } = useHangman()

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
    <header>
      <h1>Hangman</h1>
    </header>
    <div class="h-screen">
      <div>Score: <span>{{ score }}</span> </div>
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
          LETS GOOOOOO
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
        <button>Guess Word</button>

        <Keyboard />
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
