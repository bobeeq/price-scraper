<script>
import { useEanStore } from '@/stores/eanStore';
import { useConfigStore } from '@/stores/configStore'

export default {
    name: 'Prices',
    data() {
        return {
            eanStore: useEanStore(),
            configStore: useConfigStore()
        }
    }
}
</script>

<template>
    <div class="table-wrapper">
        <table>
            <tr>
                <th>ean</th>
                <th v-for="[bookstore, download] of configStore.activeDownloads" :key="bookstore + '_' + download">
                    {{ bookstore }}_{{ download }}
                </th>
            </tr>
            <tr v-for="ean of eanStore.eans" :key="ean.code">
                <td>{{ ean.code }}</td>
                <td v-for="[bookstore, download] of configStore.activeDownloads" :key="bookstore + '_' + download">{{
                    ean.prices?.[bookstore]?.[download]
                }}</td>
            </tr>
        </table>
    </div>
</template>

<style scoped>
.table-wrapper {
    display: flex;
    justify-content: center;
    padding: 20px;
}
.table-wrapper table {
    width: 100%;
    text-align: center;
    border-collapse: collapse;
}

table, th, td {
    border: 1px solid #eee;
    padding: 3px;
}

th {
    background-color: #111;
}
</style>