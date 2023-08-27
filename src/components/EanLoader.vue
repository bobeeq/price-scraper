<script>

import { useEanStore } from '@/stores/eanStore';

export default {


    name: 'EanLoader',


    data() {
        return {
            eanStore: useEanStore(),
            eans: ""
        }
    },

    methods: {
        loadEans(overwrite = false) {
            this.eanStore.loadEans(this.eans, overwrite);
            this.eans = '';
        },
        clearEans() {
            this.eanStore.loadEans("", 'overwrite');
        }
    },


    computed: {
        addString() {
            return 'Dodaj' + (Object.keys(this.eanStore.eans).length > 0 ? ' do istniejących' : '');
        }
    }
}
</script>

<template>
    <div class="ean-loader">
        <div class="options">
            <div v-show="eans" @click="loadEans">{{ addString }}</div>
            <div v-show="eans && !eanStore.empty" @click="loadEans('overwrite')">Nadpisz</div>
            <div v-show="!eanStore.empty" @click="clearEans">Wyczyść Listę</div>
        </div>
        <div class="ean-list-wrapper">
            <textarea v-model="eans"></textarea>
            <div class="ean-list">
                <div v-for="ean of eanStore.eans" :key="ean.code" class="ean-item">
                    <span class="delete" @click="eanStore.removeEan(ean.code)">❌</span>
                    <span>{{ ean.code }}</span>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.ean-loader {
    display: flex;
    flex: 1;
    align-items: stretch;
    flex-direction: column;
    padding: 20px;
    min-height: 0;
}

.ean-loader>* {
    flex: 1;
}

.options {
    display: flex;
    flex: 0;
    justify-content: space-between;
    gap: 20px;
    margin: 15px 0;
}

.options > * {
    padding: 10px;
    cursor: pointer;
    text-align: center;
    flex: 1;
    font-size: 1.3em;
    user-select: none;
    border-radius: 15px;
    background-color: #222;
}

.options > *:hover {
    background-color: #111;
}

.ean-loader .ean-list-wrapper {
    flex: 1;
    display: flex;
    min-height: 0;
}

.ean-list-wrapper > * {
    flex: 1;
    padding: 15px;
    box-sizing: border-box;
}

.ean-loader textarea {
    height: 100%;
    max-width: 150px;
    box-sizing: border-box;
}

.ean-list {
    display: flex;
    flex-direction: column;
    overflow-y: auto;
}

.delete {
    cursor: pointer;
    display: inline-block;
    margin: 0 10px;
}

.ean-item:hover {
    background-color: silver;
    color: black;
}

</style>