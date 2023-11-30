<script setup>
import Login from '../components/Login.vue';
import { postData } from '../services/APIService';
import { parseJwt } from '../services/JWTParse';
</script>

<template>
    <div class="Home">
        <h1>Home</h1>
    </div>
  <div>
    <Login></Login>
    <button @click="JoinGame()" id='PlayGameButton'>Play Game</button>
  </div>
</template> 


<script>
  export default {
    methods: {
      async JoinGame() {
        try {
          const decodedToken = parseJwt(localStorage.getItem('JWT-Auth'));
          const responseData = await postData("/game/join", { userID: decodedToken["UserID"] })
          console.log(responseData)
          this.$router.push('/lobby?GUID='+responseData["guid"]);
        } 
        catch (error) {
          console.log(error)
          console.error('Error:', error);
        }
      }
    },
  }
</script>