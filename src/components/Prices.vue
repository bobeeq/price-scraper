<script>
import { useEanStore } from '@/stores/eanStore';

export default {
    name: 'Prices',
    data() {
        return {
            eanStore: useEanStore()
        }
    }
}
</script>

<template>
    <ul>
        <li v-for="ean of eanStore.eans" :key="ean.code">
            {{ ean.code }}:
        </li>
    </ul>
</template>