<script setup>
    import WebSocketService from "@/services/WebSocketService.js";
</script>

<template>
    <div class="Chat">
        <h1>Chat</h1>
    </div>
<br>
<div class="chatbox">
        <div class="messages" ref="messages">
            <div v-for="(message, index) in messages" :key="index" :class="{ 'received-message': message.type === 'received', 'sent-message': message.type === 'sent' }">
                {{ message.text }}
            </div>
        </div>
        <div class="input-box">
            <input v-model="messageToSend" placeholder="Type your message...">
            <button @click="sendMessage">Send</button>
        </div>
    </div>

  
</template> 



<script>
export default {
  created() {//responses die de server terug kan sturen
    WebSocketService.on("ReceiveMessage", (message,user) => {
      this.messages.push({ text: message, type: 'received' });
      this.$nextTick(() => {
                if (this.$refs.messages) {
                    this.$refs.messages.scrollTop = this.$refs.messages.scrollHeight + this.$refs.messages.clientHeight;
                }
            });

    });
  },
  data() {
    return {
        messages: [],

      messageToSend: "",
    };
  },
  methods: {
    sendMessage() {
      const message = this.messageToSend.trim();
      if (message) {
        // Send the message to the server using the SignalR connection
        WebSocketService.invoke("SendMessage", message);
        

        this.messages.push({ text: this.messageToSend, type: 'sent' });
        this.$nextTick(() => {
                if (this.$refs.messages) {
                    this.$refs.messages.scrollTop = this.$refs.messages.scrollHeight + this.$refs.messages.clientHeight;
                }
            });
         this.messageToSend = "";

      }
    }
  },
}
</script>

<style scoped>
body {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    margin: 0;
    background-color: #f5f5f5;
}

.chatbox {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: 400px; /* Set your desired fixed height for the chatbox */
    width: 300px;
    background-color: #ffffff;
    border-radius: 8px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    overflow: hidden;
}

.messages {
    flex: 1;
    overflow-y: auto;
    padding: 10px;
}

.received-message {
    background-color: #f1f0f0;
    border-radius: 10px;
    padding: 8px;
    margin-bottom: 8px;
    max-width: 70%;
    color: black;
}

.sent-message {
    background-color: #0084ff;
    color: #ffffff;
    border-radius: 10px;
    padding: 8px;
    margin-bottom: 8px;
    align-self: flex-end;
    max-width: 70%;
}

.input-box {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px;
    border-top: 1px solid #e0e0e0;
}

.input-box input {
    flex: 1;
    padding: 8px;
    border: none;
    border-radius: 5px;
    margin-right: 10px;
}

.input-box button {
    background-color: #0084ff;
    color: #ffffff;
    border: none;
    border-radius: 5px;
    padding: 8px 16px;
    cursor: pointer;
    transition: background-color 0.3s ease;
}

.input-box button:hover {
    background-color: #0056b3;
}

</style>