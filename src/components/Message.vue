<script>

import { useMessageStore } from '../stores/messageStore';

export default {
    name: 'Message',

    props: [
        'message'
    ],


    data() {
        return {
            messageStore: useMessageStore()
        }
    }
}
</script>

<template>
    <div class="box" :class="message.type">
        <div class="time">{{ message.time }}</div>
        <div>
            <slot />
        </div>
        <a target="_blank" v-if="message.url" :href="message.url">KLIK</a>
        <div class="close" @click="messageStore.deleteMessage(message)">❌</div>
    </div>
</template>

<style scoped>
.box {
    position: relative;
    padding: 5px;
    margin: 3px 0;
    padding-right: 15px;
    display: flex;
    align-items: center;
    text-align: center;
    cursor: default;
}

a, a:active, a:visited {
    display: block;
    padding: 10px;
    background-color: maroon;
    color: white;
}

a:hover {
    filter: brightness(1.3);
}

.box:hover {
    filter: contrast(1.3);
}

.close {
    margin: 0 5px 0 10px;
    cursor: pointer;
    user-select: none;
    font-size: 1.3em;
    margin-left: auto;
}

.time {
    padding-left: 10px;
    padding-right: 30px;
}

.close:hover {
    filter: brightness(1.3);
}

.danger {
    background-color: tomato;
    color: white;
}

.success {
    background-color: yellowgreen;
}
</style>