<script setup>
import Login from '../components/Login.vue';
import axios from 'axios';
</script>

<template>
    <div class="Home">
        <h1>Home</h1>
    </div>

  <div>
    <Login></Login>
    <button @click="JoinGame()">Play Game</button>
  </div>
  
</template> 


<script>

export default {
  created() {//responses die de server terug kan sturen
    // WebSocketService.on("GetLobby", (message) => {
    //   console.log(`Lobby joined with id: ${message}`);

    // });
  },
  data() {
    return {
      userName: "",
    };
  },
  methods: {
    parseJwt(token) {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    return JSON.parse(jsonPayload);
},
    JoinGame() {
      const apiUrl = 'https://localhost:7080/Game/JoinGame';
      const decodedToken = this.parseJwt(localStorage.getItem('JWT-Auth'));
      console.log('test')
      axios.post(apiUrl, { userID: decodedToken["UserID"] },{
        headers : {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer '+localStorage.getItem('JWT-Auth')
        }
        }).then(response => {
          this.$router.push('/lobby?GUID='+response.data["guid"]);

          console.log();
        })
        .catch(error => {
            // Handle errors
            console.error('Error:', error);
        });
    }
  },
}
</script>