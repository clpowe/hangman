<script setup lang="ts">
const alphabet =  [
    'q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p',
    'a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l',
    'z', 'x', 'c', 'v', 'b', 'n', 'm'
]
</script>

<template>
  <div class="keyboard">
    <UButton  v-for="letter in alphabet" variant="ghost">
     <UKbd size="lg"  :key="letter" :value="letter" />
    </UButton>
  </div>
</template>

<style scoped>
.keyboard {
  display: flex;
  flex-wrap: wrap;
}
</style>
