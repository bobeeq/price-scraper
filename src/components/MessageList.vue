<script>

import { useMessageStore } from '../stores/messageStore'

import TheMessage from './TheMessage.vue';

export default {


    name: 'MessageList',


    components: {
        TheMessage,
    },


    data() {
        return {
            store: useMessageStore(),
            hidden: false,
        }
    },


    methods: {
        manageCloseClick() {
            this.hidden = !this.hidden;
            this.store.setNewMessageState(false);
        }
    },


}
</script>




<template>
    <div class="main" :class="{ 'hidden': hidden, 'new-message': store.newMessage }" v-show="store.messages.length > 0">

        <div class="close" @click="manageCloseClick">
            {{ hidden ? '🔼 '  + (store.newMessage ? 'NOWE ' : '') + 'KOMUNIKATY' : '🔽 ZWIŃ' }}
        </div>

        <TheMessage v-show="!hidden" v-for="message of store.messages" :message="message" :key="message.msg">
            {{ message.msg }}
        </TheMessage>
    </div>
</template>




<style scoped>
.main {
    position: fixed;
    bottom: 0;
    max-height: 300px;
    width: 100%;
    box-sizing: border-box;
    background-color: rgba(100, 100, 100, .4);
    color: black;
    padding: 30px;
    gap: 30px;
    overflow-y: auto;

    display: flex;
    flex-wrap: wrap;
}

.main.hidden {
    padding: 0;
    height: 30px;
}

.main.hidden.new-message .close {
    color: red;
}

.close {
    position: absolute;
    left: 0;
    top: 0;
    cursor: pointer;
    user-select: none;
    color: white;
}

.close:hover {
    color: black;
    filter: brightness(1.2);
}
</style>