<script setup>
import { TheChessboard } from 'vue3-chessboard';
import 'vue3-chessboard/style.css';
import chat from '../components/Chat.vue'

let boardApi;

// Client will only be able to play white pieces.
const playerColor = 'white';

// Recieve move from socket/server/etc here.
function onRecieveMove(move) {
  boardApi?.move(move);
}
</script>

<template>
    <div class="Container">
      <div class="Board">
        <TheChessboard :player-color="playerColor" @board-created="(api) => (boardApi = api)"></TheChessboard>
      </div>
      <div class="Chat">
        <chat></chat>
      </div>
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
