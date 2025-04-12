<template>
    <div class="center-container">
        <canvas id="game" width="800" height="600"></canvas>
    </div>
</template>
<script setup lang="ts">
import { KNIGHT_SPRITE } from './tsfiles/battle_knight';
import { onMounted, onUnmounted } from 'vue';
import {KEYBOARD, MOUSE } from './tsfiles/utils';
import { ListManagement } from './tsfiles/battle_list';
import { GameBattleInit } from './tsfiles/init';
let GameLoop: number;
GameBattleInit();
let sss = new KNIGHT_SPRITE(0, 0);
const GameList = new ListManagement(3);
function HandleKeydown(event: KeyboardEvent) {
    KEYBOARD.KeyDown(event.key);
    if (event.key === 'e') {
        sss.ChangeState("run")
    }
    else if (event.key === 'q') {
        sss.ChangeState("attack");
    }
    else if(event.key === 't'){
        sss.ChangeState("dead");
    }
    else {
        sss.ChangeState('idle');
    };
}
function HandleKeyUp(event: KeyboardEvent) {
    KEYBOARD.KeyUp(event.key);
}
let canvas:HTMLCanvasElement;
let ctx: CanvasRenderingContext2D;
function HandleMouseMove(event: MouseEvent) {
    const rect = canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    MOUSE.UpdatePos(x, y);
}
onMounted(() => {
    canvas = document.getElementById('game') as HTMLCanvasElement;
    ctx = canvas.getContext('2d') as CanvasRenderingContext2D;
    window.addEventListener('keydown', HandleKeydown);
    window.addEventListener('keyup', HandleKeyUp);
    window.addEventListener('mousemove', HandleMouseMove);
    GameList.AddKnight(100);
    GameList.AddKnight(200);
    GameList.AddEnemy(300);
    GameList.AddEnemy(400);
    let cnt = 0;
    GameLoop = setInterval(() => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        sss.DoAction(ctx);
        cnt++;
        KEYBOARD.MoveCamera();
        GameList.DoAllActions(ctx);
        ctx.fillRect(MOUSE.GetPos().x, MOUSE.GetPos().y, 5, 5);
    }, 30);
})
onUnmounted(() => {
    window.removeEventListener('keydown', HandleKeydown);
    window.removeEventListener('keyup', HandleKeyUp);
    window.removeEventListener('mousemove', HandleMouseMove);
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