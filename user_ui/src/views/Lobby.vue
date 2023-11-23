<script setup>
import { TheChessboard } from 'vue3-chessboard';
import 'vue3-chessboard/style.css';
import chat from '../components/Chat.vue'
import WebSocketService from "@/services/WebSocketService.js";
import { parseJwt } from '../services/JWTParse';
import { fetchData } from '../services/APIService';

</script>

<template>
    <div class="Container">
      <div class="Board" v-if="playerColor !== ''">
        <TheChessboard :player-color="playerColor" @board-created="(api) => (this.boardApi = api)" @move="handleMove"></TheChessboard>
      </div>
      <div class="Chat">
        <chat></chat>
      </div>
    </div>
  </template>
  


  <script>

  export default {
    created() {//responses die de server terug kan sturen
      WebSocketService.on("RecieveMove", (Move) => {
        console.log(Move)
        this.boardApi?.move(Move)  
      });
        },
    data() {
      return {
        boardApi: "",
        playerColor: "",
        GameID: "",
      };
    },
    methods: {
        handleMove(move) {
          const Move = move["from"] + move["to"];
          const GameGuid = this.$route.query.GUID;
          WebSocketService.invoke("SendMove", Move,GameGuid);
        },
       async JoinGame() {
        const decodedToken = parseJwt(localStorage.getItem('JWT-Auth'));
        const GameGuid = this.$route.query.GUID;
        try {
          const responseData = await fetchData("/game/"+GameGuid+"/get/"+decodedToken["UserID"]+"/color")
          console.log(responseData);
          this.playerColor = responseData['color']
          WebSocketService.invoke("JoinLobby",GameGuid);
        } 
        catch (error) {
          console.error('Error:', error);
        }
      }
  
    },
    beforeMount() {
   this.JoinGame()
},
  }
  </script>











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
