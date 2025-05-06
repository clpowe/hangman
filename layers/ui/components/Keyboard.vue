<script setup lang="ts">


const { guessLetter, guesses } = useHangman()

const alphabet =  [
    'q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p',
    'a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l',
    'z', 'x', 'c', 'v', 'b', 'n', 'm'
]
</script>

<template>
  <div class="keyboard">
    <button  v-for="letter in alphabet" size="xl" :disabled="guesses.includes(letter)" variant="outline" @click="guessLetter(letter)">
     {{ letter }}
    </button>
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
