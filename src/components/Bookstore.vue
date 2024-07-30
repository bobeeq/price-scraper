<script>

import BookstorePriceToggler from './BookstorePriceToggler.vue';

import { useConfigStore } from '@/stores/configStore';
import { useAjaxStore } from '@/stores/ajaxStore';

export default {
    name: 'Bookstore',


    props: {
        bookstore: {
            type: String,
            required: true
        }
    },


    components: {
        BookstorePriceToggler
    },


    data() {
        return {
            configStore: useConfigStore(),
            ajaxStore: useAjaxStore(),
        }
    },


    computed: {
        active() {
            return this.configStore.isBookstoreActive(this.bookstore)
        },
        left() {
            return this.ajaxStore.threads[this.bookstore]?.queue.length;
        }
    }


}
</script>

<template>
    <div class="main" :class="{ active: active && left > 0 }">
        <h3>{{ configStore.bookstores[bookstore].name }}</h3>
        <BookstorePriceToggler v-for="download of ['default', 'google', 'ceneo']" :key="download" :download="download"
            :bookstore="bookstore" />
        <div class="delays-text">opóźnienia</div>
        <div class="delays">
            <input
                type="number"
                min="1"
                :max="configStore.bookstores[bookstore].delays.max"
                v-model="configStore.bookstores[bookstore].delays.min"
            >
            <input
                type="number"
                :min="configStore.bookstores[bookstore].delays.min"
                max="20"
                v-model="configStore.bookstores[bookstore].delays.max"
            >
        </div>
        <div class="left-in-queue">
            <span>pozostało:</span><span>{{ left }}</span>
        </div>
    </div>
</template>


<style scoped>
.main {
    /* margin: 20px; */
    padding: 10px 20px;
    display: flex;
    flex-direction: column;
    background-color: gray;
    color: black;
    user-select: none;
}

.left-in-queue {
    display: flex;
    justify-content: space-between;
}

.delays-text {
    text-align: center;
}
.delays {
    display: flex;
    justify-content: space-between;
}

.delays > input {
    width: 40px;
    transform: scale(1.5);
    text-align: center;
    padding: 0;
}

h3 {
    text-align: center;
}

.main.active {
    opacity: 1;
    background: green;
    color: white;
}
</style>