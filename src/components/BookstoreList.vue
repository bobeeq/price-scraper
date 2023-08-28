<script>

import { useConfigStore } from '@/stores/configStore';

import Bookstore from './Bookstore.vue';
import { useAjaxStore } from '@/stores/ajaxStore';
import { useEanStore } from '@/stores/eanStore';

export default {
    name: "BookstoreList",


    components: {
        Bookstore
    },


    data() {
        return {
            configStore: useConfigStore(),
            ajaxStore: useAjaxStore(),
            eanStore: useEanStore()
        }
    },

    methods: {
        manageClick() {
            if(!this.btnActive) return;
            if(this.btnGreen) {
                this.ajaxStore.runThreads();
            } else {
                this.ajaxStore.pauseThreads();
            }
        },
    },

    computed: {
        btnGreen() {
            return !this.ajaxStore.checkingIfFinishedInterval;
        },
        btnText() {
            return this.btnGreen ? 'start' : 'stop';
        },
        btnActive() {
            return this.configStore.anythingToDownload && Object.keys(this.eanStore.eans).length;
        }
    }
}
</script>

<template>
    <div class="main">
        <Bookstore v-for="bookstore of Object.keys(configStore.bookstores)" :key="bookstore" :bookstore="bookstore"/>
    </div>
    <div class="run-box">
        <div class="btn" :class="{'active' : btnActive, 'start': btnGreen, 'stop': !btnGreen}" @click="manageClick">{{ btnText }}</div>
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
    .btn {
        padding: 10px 20px;
        cursor: pointer;
        margin: 20px;
        width: 100px;
        text-align: center;
        user-select: none;
        text-transform: uppercase;
    }

    .btn.start {
        background-color: green;
    }

    .btn.start:not(.active) {
        cursor: default;
        background-color: gray;
    }

    .btn.stop {
        background-color: tomato;
    }

    .btn:hover {
        filter: saturate(1.5);
    }

    .run-box > * {
        padding: 10px;
    }
</style>