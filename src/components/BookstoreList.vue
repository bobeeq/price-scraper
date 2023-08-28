<script>

import { useConfigStore } from '@/stores/configStore';

import Bookstore from './Bookstore.vue';
import { useAjaxStore } from '@/stores/ajaxStore';

export default {
    name: "BookstoreList",


    components: {
        Bookstore
    },


    data() {
        return {
            configStore: useConfigStore(),
            ajaxStore: useAjaxStore(),
            btnText: ''
        }
    },

    methods: {
        manageClick() {
            if(this.btnText == 'START') {
                this.ajaxStore.startAjaxes();
            } else if(this.btnText == 'STOP') {
                this.ajaxStore.stopAjaxes();
            }

            this.setBtnText();
        },

        setBtnText() {
            this.btnText = this.ajaxStore.isFinishedInterval ? 'STOP' : 'START';

        }
    },

    mounted() {
        this.setBtnText();
    }
}
</script>

<template>
    <div class="main">
        <Bookstore v-for="bookstore of Object.keys(configStore.bookstores)" :key="bookstore" :bookstore="bookstore"/>
    </div>
    <div class="run-box">
        <div class="btn" :class="btnText === 'START' ? 'start' : 'stop'" @click="manageClick">{{ btnText }}</div>
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
    }

    .btn.start {
        background-color: green;
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