<script>

import { useMenuStore } from '@/stores/menuStore';

export default {
    name: 'Menu',
    data() {
        return {
            menuStore: useMenuStore()
        }
    }
}
</script>

<template>
<div class="menu">
    <div
        :class="{'active' : menuStore.activeTab == menuItem}"
        v-for="menuItem of ['Ustawienia Księgarń', 'Dodaj Eany', 'Pobrane Ceny', 'Logi']"
        :key="menuItem"
        @click="menuStore.activeTab = menuItem"
    >
        {{ menuItem }}
    </div>
</div>
</template>

<style scoped>
    .active {
        background-color: #000;
    }

    .menu {
        display: flex;
        justify-content: space-between;
    }

    .menu > div {
        padding: 15px;
        flex: 1;
        text-align: center;
        cursor: pointer;
    }

    .menu > div:hover {
        background-color: #111;
    }
</style>