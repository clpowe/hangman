<script setup lang="ts">


const { guessLetter, guesses, correctLetters } = useHangman()

const alphabet =  [
    'q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p',
    'a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l',
    'z', 'x', 'c', 'v', 'b', 'n', 'm'
]
</script>

<template>
  <div class="keyboard">
    <UButton  v-for="letter in alphabet" size="xl" class="grid uppercase content-center place-content-center w-12 h-12 bg-[var(--fill)]  text-[var(--text-strong)]"
    :class="guesses.includes(letter) && !correctLetters.has(letter) ? 'disabled:bg-red-500 border-2 disabled:border-red-500' : 'disabled:bg-green-500 border-2 disabled:border-green-500'"
      :disabled="guesses.includes(letter)"  @click="guessLetter(letter)" 
    :ui="{
      button: {
  slot:{
    base:[
          'rounded-md font-medium inline-flex items-center disabled:cursor-not-allowed aria-disabled:cursor-not-allowed ',
          'transition-colors'
        ],
  }}}">
     {{ letter }}
    </UButton>
  </div>
</template>

<style scoped>
.keyboard {
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
  justify-content: center;
}
</style>
