<script setup>
import { TheChessboard } from 'vue3-chessboard';
import 'vue3-chessboard/style.css';
import chat from '../components/Chat.vue'

let boardApi;

// Client will only be able to play white pieces.
const playerColor = 'white';

// Recieve move from socket/server/etc here.
function handleMove(move) {
  console.log(move["from"],move["to"]);
  const Move = move["from"] + move["to"];
  WebSocketService.invoke("SendMove", Move);
}

function recieveMove(){
  boardApi?.move("b2b4")
  console.log("test");
}
</script>

<template>
    <div class="Container">
      <div class="Board">
        <TheChessboard :player-color="playerColor" @board-created="(api) => (boardApi = api)" @move="handleMove"></TheChessboard>
      </div>
      <div class="Chat">
        <chat></chat>
      </div>
      <button @click="recieveMove()"></button>
    </div>
  </template>
  
  <style scoped>
  .Container {
    display: flex;
    justify-content: space-between;  /* Adjust this based on your layout requirements */
    width: 100%;
    height: 80vh;  /* You can adjust the height as per your design */
  }
  
  .Board {
    flex: 1;  /* This allows the chessboard to grow and occupy available space */
    /* Add other styles for your chessboard container */
  }
  
  .Chat {
    flex: 1; 
    height: 93%;
    margin-left:5%;
  }
  </style>
