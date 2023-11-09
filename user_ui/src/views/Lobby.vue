<script setup>
import { TheChessboard } from 'vue3-chessboard';
import 'vue3-chessboard/style.css';
import chat from '../components/Chat.vue'
import WebSocketService from "@/services/WebSocketService.js";
import axios from 'axios';

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
          console.log(move["from"],move["to"]);
          const Move = move["from"] + move["to"];
          const GameGuid = this.$route.query.GUID;
          WebSocketService.invoke("SendMove", Move,GameGuid);
        },
        parseJwt(token) {
          const base64Url = token.split('.')[1];
          const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
          const jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
              return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
          }).join(''));
          return JSON.parse(jsonPayload);
      },
      JoinGame() {
        const apiUrl = 'https://localhost:7080/Game/GetPlayerColor';
        const decodedToken = this.parseJwt(localStorage.getItem('JWT-Auth'));
        const GameGuid = this.$route.query.GUID;
        axios.post(apiUrl, { userID: decodedToken["UserID"], guid: GameGuid },{
          headers : {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer '+localStorage.getItem('JWT-Auth')
          }
          }).then(response => {
            console.log(response.data)
            this.playerColor = response.data['color']

           WebSocketService.invoke("JoinLobby",GameGuid);
          })
          .catch(error => {
              // Handle errors
              console.error('Error:', error);
          });
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
