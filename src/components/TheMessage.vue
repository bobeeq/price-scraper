<script>
export default {
    name: 'TheMessage',
    props: [
        'message'
    ],
}
</script>

<template>
    <div class="box" :class="message.type">
        <div class="close" @click="$emit('delete-message', message)">&#10060;</div>
        <slot />
    </div>
</template>

<style scoped>
.box {
    border: 2px solid black;
    padding: 5px;
    border-radius: 10px;
    padding: 20px;
    position: relative;
    max-width: 350px;
    display: flex;
    align-items: center;
    text-align: center;
}
.close {
    position: absolute;
    right: -10px;
    top: -10px;
    cursor: pointer;
    user-select: none;
}

.danger {
    background-color: red;
    color: white;
}

.success {
    background-color: yellowgreen;
}
</style>