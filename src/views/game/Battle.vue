<template>
    <div class="center-container">
        <canvas id="game" width="800" height="600"></canvas>
    </div>
</template>
<script setup lang="ts">
import { GameBattleInit, KNIGHT_SPRITE } from './tsfiles/battle_knight';
import { onMounted, onUnmounted } from 'vue';
let game_key = '';
function HandleKeydown(event: KeyboardEvent) {
    game_key = event.key;
}
let GameLoop: number;
onMounted(() => {
    const canvas = document.getElementById('game') as HTMLCanvasElement;
    const ctx = canvas.getContext('2d') as CanvasRenderingContext2D;
    window.addEventListener('keydown', HandleKeydown);
    GameBattleInit();
    let sss = new KNIGHT_SPRITE(10, 10);
    let cnt = 0;
    GameLoop = setInterval(() => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        if(game_key === 'd'){
            sss.DrawRun(ctx, cnt);
        }
        else if(game_key === 'q') {
            sss.DrawAttack(ctx, cnt);
        }
        else{
            sss.DrawIdle(ctx, cnt);
        }
        cnt++;
    }, 30);
})
onUnmounted(() => {
    window.removeEventListener('keydown', HandleKeydown);
    clearInterval(GameLoop);
})

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