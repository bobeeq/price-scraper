import { defineStore } from "pinia";

export const useMenuStore = defineStore('menuStore',  {
    state() {
        return {
            activeTab: null
        }
    },
    actions: {

    }
})