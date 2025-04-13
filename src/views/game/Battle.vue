<template>
    <div class="center-container">
        <canvas id="game" width="800" height="600"></canvas>
    </div>
</template>
<script setup lang="ts">
import { StartGame } from './battle/main';
import { onMounted } from 'vue';
onMounted(()=>{
    StartGame();
});
</script>
<style scoped>
.center-container {
    display: flex;
    justify-content: center;
}

#game {
    border: 3px solid black;
}
</style>