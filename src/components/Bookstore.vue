<script>

import BookstorePriceToggler from './BookstorePriceToggler.vue';
import { useConfigStore } from '@/stores/configStore';

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
            configStore: useConfigStore()
        }
    },


    computed: {
        active() {
            return this.configStore.isBookstoreActive(this.bookstore)
        }
    }


}
</script>

<template>
    <div class="main" :class="{ active }">
        <h3>{{ configStore.bookstores[bookstore].name }}</h3>
        <BookstorePriceToggler v-for="download of ['default', 'google']" :key="download" :download="download"
            :bookstore="bookstore" />
    </div>
</template>


<style scoped>
.main {
    border: 2px solid black;
    border-radius: 20px;
    margin: 20px;
    padding: 20px;
    display: flex;
    flex-direction: column;
    gap: 20px;
    background-color: black;
    opacity: .3;
    cursor: pointer;
    user-select: none;
}

h3 {
    text-align: center;
}

.main:hover {
    opacity: .6;
}

.main.active {
    opacity: 1;
    background: darkgreen;
    color: white;
}

.main.active:hover {
    background-color: green;
}
</style>