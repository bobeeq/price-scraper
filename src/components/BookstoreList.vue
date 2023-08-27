<script>

import { useConfigStore } from '@/stores/configStore';

import Bookstore from './Bookstore.vue';
import { useAjaxStore } from '@/stores/ajaxStore';

export default {
    name: "BookstoreList",


    components: {
        Bookstore
    },


    data() {
        return {
            configStore: useConfigStore(),
            ajaxStore: useAjaxStore()
        }
    }
}
</script>

<template>
    <div class="main">
        <Bookstore v-for="bookstore of Object.keys(configStore.bookstores)" :key="bookstore" :bookstore="bookstore"/>
    </div>
    <div class="run-box">
        <button @click="ajaxStore.startAjaxes()">GO</button>
        <button @click="ajaxStore.stopAjaxes()">STOP</button>
    </div>
</template>

<style scoped>
    .main {
        display: flex;
        gap: 10px;
        justify-content: center;
    }

    .run-box {
        display: flex;
        justify-content: center;
        gap: 20px;
    }

    .run-box > * {
        padding: 10px;
    }
</style>