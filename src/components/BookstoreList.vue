<script>

import { useMessageStore } from '../stores/messageStore';

import Bookstore from './Bookstore.vue';

export default {
    name: "BookstoreList",


    components: {
        Bookstore
    },


    data() {
        return {
            store: useMessageStore()
        }
    }
}
</script>

<template>
    <div class="main">
        <Bookstore bookstore="Bonito"/>
        <Bookstore bookstore="Gandalf"/>
        <Bookstore bookstore="Tantis"/>
        <Bookstore bookstore="Świat Książki"/>
        <Bookstore bookstore="Empik"/>
    </div>
</template>

<style scoped>
    .main {
        display: flex;
        justify-content: center;
    }
</style>