<template>
    <div class="center-container">
        <div id="main-view">
            <div class="Player"></div>
            <div class="Player"></div>
            <div class="Player"></div>
            <div class="Player"></div>
            <div class="Player"></div>
            <div class="Player"></div>
        </div>
    </div>
</template>
<script setup lang="ts">
</script>
<style scoped>
.center-container {
  display: flex;
  justify-content: center; 
}
#main-view{
    overflow-x: auto;
    white-space: nowrap;
    width: 70vw;
    background-color: rgb(215, 189, 189);
}
#main-view::-webkit-scrollbar-track {
    display: none;
}
#main-view::-webkit-scrollbar-thumb {
    background-color: #b5696992;
    border-radius: 10px;
}
#main-view::-webkit-scrollbar-thumb:hover {
    background-color: #555;
    cursor: pointer;
}
#main-view::-webkit-scrollbar {
    width: 6px;
}
#main-view::-webkit-scrollbar-button{
    display: none;
}
.Player{
    margin: 5vh 5vw;
    width: 300px;
    height: 70vh;
    background-color: red;
    border: 5px solid black;
    border-radius: 40px;
    display: inline-block;
}

</style>