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
            {{ ean.code }}: {{ ean.prices }}
        </li>
        <div class="gandalf">
            <div>GANDALF DO EXCELA:</div>
            <div>
                <table>
                    <tr>
                        <td>ean</td>
                        <td>zwykła</td>
                        <td>google</td>
                    </tr>
                    <tr v-for="ean of eanStore.eans" :key="ean.code">
                        <td>{{ ean.code }}</td><td>{{ ean.prices?.gandalf?.default }}</td><td>{{ ean.prices?.gandalf?.google }}</td>
                    </tr>
                </table>
            </div>
        </div>
    </ul>
</template>

<style scoped>
.gandalf {
    background-color: tomato;
    margin: 30px;
    width: 500px;
}
</style>