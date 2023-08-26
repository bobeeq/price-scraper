<script>

import MessageList from './components/MessageList.vue';
import BookstoreList from './components/BookstoreList.vue';

import { useMessageStore } from '@/stores/messageStore';

export default {


  name: 'App',


  components: {
    MessageList,
    BookstoreList,
  },


  data() {
    return {
      store: useMessageStore()
    }
  },


  mounted() {
    const url = (parseInt(Math.random() * 1000) % 2) ? 'http://192.168.1.100:8080/price-scraper/dist/' : 'https://classic.bonito.pl/';
    fetch(url, { credentials: 'include', mode: 'cors' })
      .then(() => {
        this.store.addMessage('success', 'Konfiguracja prawidłowa, możemy zaczynać.');
        this.store.addMessage('danger', 'testowy message.');
      })
      .catch(e => {
        if (e.message == 'NetworkError when attempting to fetch resource.') {
          this.store.addMessage('danger', 'Nie będę mógł pobierać cen z bonito. Włącz CORS plugin i odśwież przeglądarkę.');
        
          this.store.addMessage('success','testowy message.');
        }
      });
  }


}
</script>

<template>
  <BookstoreList />
  
  <MessageList />
  <button @click="store.addMessage((parseInt(Math.random() * 1000) % 2 == 0) ? 'danger' : 'success', 'dupa')">Add random message</button>
</template>


<style>
body {
  background-color: #333;
  color: #ddd;
  padding: 0;
  margin: 0;
  font-size: 1.2em;
}
</style>
