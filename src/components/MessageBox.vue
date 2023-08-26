<script>

import TheMessage from './TheMessage.vue';

export default {


    name: 'MessageBox',


    components: {
        TheMessage,
    },


    methods: {
        deleteMessage(message) {
            this.messages.splice(this.messages.indexOf(message), 1);
        }
    },


    props: [
        'messages'
    ],


}
</script>

<template>
    <div class="main" v-show="messages.length > 0">
        <TheMessage v-for="message of messages" :message="message" :key="message.msg" @delete-message="deleteMessage">
            {{ message.msg }}
        </TheMessage>
    </div></template>

<style scoped>
.main {
    position: fixed;
    bottom: 0;
    max-height: 300px;
    width: 100vw;
    background-color: rgba(100,100,100,.4);
    color: black;
    padding: 30px;
    gap: 30px;

    display: flex;
    /* align-items: flex-start; */
}
</style>