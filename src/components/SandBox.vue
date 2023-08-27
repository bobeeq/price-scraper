<script>

import { useAjaxStore } from '@/stores/ajaxStore';
import { useMessageStore } from '@/stores/messageStore';

export default {
    name: 'SandBox',
    components: {
    },

    data() {
        return {
            messageStore: useMessageStore(),
            ajaxStore: useAjaxStore()
        }
    }
}
</script>

<template>
    <div class="wrapper">
        <button @click="ajaxStore.startAjaxes()">GO</button>
        <button @click="ajaxStore.stopAjaxes()">STOP</button>
    </div>
</template>

<style scoped>
.wrapper {
    padding: 20px;
    margin: 20px;
    border-radius: 20px;
    border: 3px dashed black;
    display: flex;
    flex-direction: column;
    gap: 10px;
}
</style>