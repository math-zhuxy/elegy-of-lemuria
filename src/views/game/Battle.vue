<template>
    <div class="center-container">
        <canvas id="game" width="800" height="600"></canvas>
    </div>
</template>
<script setup lang="ts">
import { GameBattleInit, KNIGHT_SPRITE } from './tsfiles/battle_knight';
import { onMounted, onUnmounted } from 'vue';
import {KEYBOARD } from './tsfiles/utils';
let GameLoop: number;
let sss = new KNIGHT_SPRITE(0, 0);
function HandleKeydown(event: KeyboardEvent) {
    KEYBOARD.KeyDown(event.key);
    if (event.key === 'e') {
        sss.ChangeState("run")
    }
    else if (event.key === 'q') {
        sss.ChangeState("attack");
    }
    else {
        sss.ChangeState('idle');
    };
}
function HandleKeyUp(event: KeyboardEvent) {
    KEYBOARD.KeyUp(event.key);
}
onMounted(() => {
    const canvas = document.getElementById('game') as HTMLCanvasElement;
    const ctx = canvas.getContext('2d') as CanvasRenderingContext2D;
    window.addEventListener('keydown', HandleKeydown);
    window.addEventListener('keyup', HandleKeyUp);
    GameBattleInit();
    let cnt = 0;
    GameLoop = setInterval(() => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        sss.DoAction(ctx);
        cnt++;
        KEYBOARD.MoveCamera();
    }, 30);
})
onUnmounted(() => {
    window.removeEventListener('keydown', HandleKeydown);
    window.removeEventListener('keyup', HandleKeyUp);
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