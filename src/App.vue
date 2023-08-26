<script>

import TheButton from './components/TheButton.vue';
import MessageBox from './components/MessageBox.vue'

export default {


  name: 'App',


  components: {
    TheButton,
    MessageBox
  },


  data() {
    return {
      messages: []
    }
  },


  mounted() {
    const url = (parseInt(Math.random() * 1000 ) % 2 ) ? 'http://192.168.1.100:8080/price-scraper/dist/' : 'https://wpppppp.pl/';
    fetch(url, {credentials: 'include', mode: 'cors'})
      .then(() => this.messages.push({type: 'success', msg: 'Konfiguracja prawidłowa, możemy zaczynać.'}, {type: 'danger', msg: 'testowy message.'}))
      .catch(e => {
        if (e.message == 'NetworkError when attempting to fetch resource.') {
          this.messages.push({type: 'danger', msg: 'Nie będę mógł pobierać cen z bonito. Włącz CORS plugin i odśwież przeglądarkę.'}, {type: 'success', msg: 'testowy message.'});
        }
      });
  }


}
</script>

<template>
  Button powinien być tuta:
  <TheButton text="Naciśnij kurła!" />




  <MessageBox :messages="messages" />
</template>


<style>
body {
  background-color: #333;
  color: #ddd;
  padding: 0;
  margin: 0;
}
</style>
