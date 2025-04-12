<template>
    <div class="center-container">
        <canvas id="game" width="800" height="600"></canvas>
    </div>
</template>
<script setup lang="ts">
import { onMounted, onUnmounted } from 'vue';
import { CAMERA, KEYBOARD, MOUSE } from './tsfiles/utils';
import { GameSpriteManagement, ListManagement } from './tsfiles/battle_list';
import { GameBattleInit } from './tsfiles/init';
let GameLoop: number;
GameBattleInit();
let Test_Using_Knight = true;
function HandleKeydown(event: KeyboardEvent) {
    KEYBOARD.KeyDown(event.key);
    if (event.key === 'q') {
        Test_Using_Knight = true;
    }
    else if (event.key === 'e') {
        Test_Using_Knight = false;
    }
}
function HandleKeyUp(event: KeyboardEvent) {
    KEYBOARD.KeyUp(event.key);
}

let canvas: HTMLCanvasElement;
let ctx: CanvasRenderingContext2D;
const GameManage = new GameSpriteManagement()
function HandleMouseClick(event: MouseEvent) {
    const rect = canvas.getBoundingClientRect();
    const x = event.clientX - rect.left + CAMERA.GetPos().x;
    const y = event.clientY - rect.top + CAMERA.GetPos().y;
    const set_index = Math.min(Math.floor(y / ListManagement.ListLength), 14);
    if(Test_Using_Knight)GameManage.ListSet[set_index].AddKnight(x);
    else GameManage.ListSet[set_index].AddEnemy(x);
}
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
    window.addEventListener('click', HandleMouseClick);
    GameLoop = setInterval(() => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        KEYBOARD.MoveCamera();
        GameManage.DoAction(ctx);
        ctx.fillRect(MOUSE.GetPos().x, MOUSE.GetPos().y, 5, 5);
    }, 30);
})
onUnmounted(() => {
    window.removeEventListener('keydown', HandleKeydown);
    window.removeEventListener('keyup', HandleKeyUp);
    window.removeEventListener('mousemove', HandleMouseMove);
    window.removeEventListener('click', HandleMouseClick);
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