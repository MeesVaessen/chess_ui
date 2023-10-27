<script setup>
    import WebSocketService from "@/services/WebSocketService.js";
</script>

<template>
    <div class="Home">
        <h1>Home</h1>
    </div>

    <div>
    <input v-model="userName"  placeholder="Name" />
    <button @click="joinLobby">Join Lobby</button>
  </div>
  
</template> 


<script>
export default {
  created() {//responses die de server terug kan sturen
    WebSocketService.on("GetLobby", (message) => {
      console.log(`Lobby joined with id: ${message}`);
            this.$router.push('/lobby');

    });
  },
  data() {
    return {
      userName: "",
    };
  },
  methods: {
    joinLobby() {
      const user = this.userName.trim();
      if(user) {
        WebSocketService.invoke("JoinLobby", user);
      }
    }
  },
}
</script>