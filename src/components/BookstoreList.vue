<script>

import { useConfigStore } from '@/stores/configStore';

import Bookstore from './Bookstore.vue';

export default {
    name: "BookstoreList",


    components: {
        Bookstore
    },


    data() {
        return {
            configStore: useConfigStore()
        }
    }
}
</script>

<template>
    <div class="main" >
        <Bookstore v-for="bookstore of Object.keys(configStore.bookstores)" :key="bookstore" :bookstore="bookstore"/>
    </div>
</template>

<style scoped>
    .main {
        display: flex;
        justify-content: center;
    }
</style>