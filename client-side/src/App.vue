<script setup>
import { io } from 'socket.io-client';
import { onBeforeMount, ref } from 'vue';

const socket = io('http://localhost:3000');
const messages = ref([]);
const name = ref('');
const channel = ref('');
const joined = ref(false); // Katılım durumunu takip etmek için reactive reference

const join = () => {
  if (name.value && channel.value) {
    // Emit subscribe event to the server with username and channel
    socket.emit('subscribe', channel.value, name.value, (response) => {
      if (response.success) {
        joined.value = true;
         // Kanala katıldıktan sonra mesajları getir
      } else {
        alert('Failed to join channel. Please check your credentials.');
      }
    });

    // Kanala katıldıktan sonra mesajları dinle
    socket.on('message', (message) => {
      messages.value.push(message);
    });
  } else {
    alert('Please enter username and channel.');
  }
};



onBeforeMount(() => {
  // Vue bileşeni yüklendiğinde otomatik olarak bağlan ve mesajları dinle
  socket.on('connect', () => {
    console.log('Connected to socket server');
  });

  socket.on('disconnect', () => {
    console.log('Disconnected from socket server');
  });
});
</script>

<template>
  <div class="chat">
    <div v-if="!joined">
      <form @submit.prevent="join">
        <label>Username:</label>
        <input type="text" v-model="name" required />
        <label>Channel:</label>
        <input type="text" v-model="channel" required />
        <button type="submit">Join</button>
      </form>
    </div>
    <div class="chat-container" v-if="joined">
      <div class="message-container">
        <div v-for="message in messages" :key="message.id">
          [{{ message.name }}] : {{ message.text }}
        </div>
      </div>
    </div>
  </div>
</template>

<style>
@import './assets/base.css';
</style>
