<script setup>
import { TheChessboard } from 'vue3-chessboard';
import 'vue3-chessboard/style.css';

let boardApi;

// Client will only be able to play white pieces.
const playerColor = 'white';

// Recieve move from socket/server/etc here.
function onRecieveMove(move) {
  boardApi?.move(move);
}
</script>

<template>
  <TheChessboard
    :player-color="playerColor"
    @board-created="(api) => (boardApi = api)"
  />
</template>