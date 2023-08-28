<script>

import MessageList from './components/MessageList.vue';
import BookstoreList from './components/BookstoreList.vue';
import Menu from './components/Menu.vue';
import SandBox from './components/SandBox.vue';
import EanLoader from './components/EanLoader.vue';
import Prices from './components/Prices.vue';
import Login from './components/Login.vue';


import { useMessageStore } from '@/stores/messageStore';
import { useMenuStore } from './stores/menuStore';
import { useConfigStore } from './stores/configStore';


export default {


  name: 'App',


  components: {
    MessageList,
    BookstoreList,
    SandBox,
    Menu,
    EanLoader,
    Prices,
    Login
  },


  data() {
    return {
      messageStore: useMessageStore(),
      menuStore: useMenuStore(),
      configStore: useConfigStore(),
      sandbox: false,
    }
  },


  mounted() {

    if(localStorage.getItem('auth') == '6ec58d2f6c08aa9ec5eb84db49281b4c') this.configStore.auth = true;

    this.menuStore.activeTab = 'Ustawienia Księgarń';

    const url = (parseInt(Math.random() * 1000) % 2) ? 'http://192.168.1.100:8080/price-scraper/dist/' : 'https://classic.bonito.pl/';
    fetch(url, { credentials: 'include', mode: 'cors' })
      .then(() => {
        this.messageStore.addMessage('success', 'Konfiguracja prawidłowa, możemy zaczynać.');
      })
      .catch(e => {
        if (e.message == 'NetworkError when attempting to fetch resource.') {
          this.messageStore.addMessage(
            'danger',
            'UWAGA! Nie będę mógł pobierać cen z bonito. Włącz dodatek "Corse everywhere" w przeglądarce i odśwież stronę.',
            { url: 'https://addons.mozilla.org/en-US/firefox/addon/cors-everywhere/' }
          );
        }
      });
  }


}
</script>

<template>
  <Menu />

  <div class="app-container">
    <SandBox v-if="sandbox" />
    <template v-else>
      <Login v-if="!configStore.auth" />
      <template v-else>
        <EanLoader v-if="menuStore.activeTab == 'Dodaj Eany'" />
        <BookstoreList v-if="menuStore.activeTab == 'Ustawienia Księgarń' && !sandbox" />
        <Prices v-if="menuStore.activeTab == 'Pobrane Ceny' && !sandbox" />
      </template>
    </template>


    <!-- DEBUG -->
    <button @click="messageStore.addMessage((parseInt(Math.random() * 1000) % 2 == 0) ? 'danger' : 'success', 'dupa')"
      style="position:fixed; left: 0; top: 300px;">
      Add random message
    </button>
    <MessageList />
    <!-- DEBUG -->

  </div>
</template>


<style>
body {
  background-color: #333;
  color: #ddd;
  padding: 0;
  margin: 0;
  font-size: 1.2em;
}

#price-scraper-app {
  height: 97vh;
  display: flex;
  flex-direction: column;
}

.app-container {
  padding: 0;
  margin: 0;
  margin-top: 20px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  flex: 1;
  min-height: 0;
}
</style>
