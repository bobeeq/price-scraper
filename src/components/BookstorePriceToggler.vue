<script>
import TogglerBtn from './TogglerBtn.vue';
import { useConfigStore } from '@/stores/configStore';
import { useAjaxStore } from '@/stores/ajaxStore';

export default {


    name: 'BookstorePriceToggler',


    components: {
        TogglerBtn,
    },


    props: {
        bookstore: {
            type: String,
            required: true
        },
        download: {
            type: String,
            required: true
        }
    },


    data() {
        return {
            configStore: useConfigStore(),
            ajaxStore: useAjaxStore()
        }
    },


    methods: {
        toggle() {
            if(this.configStore.isDownloading(this.bookstore, this.download)) {
                this.configStore.deactivateDownload(this.bookstore, this.download);
            } else if(this.configStore.canBeDownloaded(this.bookstore, this.download)) {
                this.configStore.activateDownload(this.bookstore, this.download);
            }
        }
    }
}
</script>

<template>
    <TogglerBtn
        @click="toggle"
        :active="configStore.isDownloading(bookstore, download)"
        :disabled="!configStore.canBeDownloaded(bookstore, download)"
        :title="!configStore.canBeDownloaded(bookstore, download) ? 'Obsługa nie została zaimplementowana' : ''"
    >
        {{ download }}
    </TogglerBtn>
</template>