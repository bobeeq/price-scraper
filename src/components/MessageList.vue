<script>

import { useMessageStore } from '../stores/messageStore'

import Message from './Message.vue';

export default {


    name: 'MessageList',


    components: {
        Message,
    },


    data() {
        return {
            messageStore: useMessageStore(),
        }
    },


    methods: {
    },


}
</script>


<template>
    <div class="main" :class="{ 'hidden' : !messageStore.newMessage }" v-show="messageStore.messages.length > 0">
        <div class="delete-all" @click="messageStore.deleteAll()">Wyczyść komunikaty</div>
        <div class="messages">
            <Message v-show="!hidden || messageStore.newMessage" v-for="message of messageStore.messages" :message="message" :key="message.msg + message.time">
                {{ message.msg }}
            </Message>
        </div>
    </div>
</template>




<style scoped>
.main {
    position: fixed;
    bottom: 0;
    max-height: 300px;
    width: 100%;
    box-sizing: border-box;
    background-color: #666;
    color: black;
    overflow-y: auto;
    display: flex;
    flex-direction: column;
}

.main.hidden {
    padding: 0;
    height: 30px;
}

.messages {
    overflow-y: auto;
}

.delete-all {
    user-select: none;
    color: white;
    text-align: center;
    padding: 5px;
}

.delete-all:hover {
    background-color: black;
    cursor: pointer;
}
</style>