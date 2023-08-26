<script>

import { useMessageStore } from '../stores/messageStore';

export default {
    name: 'TheMessage',

    props: [
        'message'
    ],


    data() {
        return {
            store: useMessageStore()
        }
    }
}
</script>

<template>
    <div class="box" :class="message.type">
        <div class="close" @click="store.deleteMessage(message)">&#10060;</div>
        <slot />
    </div>
</template>

<style scoped>
.box {
    border: 2px solid black;
    padding: 10px 20px;
    border-radius: 10px;
    padding: 5x;
    position: relative;
    max-width: 350px;
    display: flex;
    align-items: center;
    text-align: center;
    cursor: default;
}

.box:hover {
    transform: scale(1.02);
    filter: brightness(1.1);
}

.close {
    position: absolute;
    right: -13px;
    top: -13px;
    cursor: pointer;
    user-select: none;
    font-size: 1.3em;
}

.close:hover {
    filter: brightness(1.3);
}

.danger {
    background-color: red;
    color: white;
}

.success {
    background-color: yellowgreen;
}
</style>