import { defineStore } from 'pinia';

export const useEanStore = defineStore('eanStore', {
    state() {
        return {
            eans: {

            },
            empty: true
        }
    },
    actions: {
        loadEans(eans, overwrite = false) {
            if(overwrite == 'overwrite') {
                for(const key in this.eans) {
                    delete this.eans[key];
                }
            }
            if(typeof eans == 'string') {
                eans = eans.split("\n").map(ean => ean.trim()).filter(ean => ean);
            }

            for(const ean of eans) {
                this.eans[ean] = {code: ean, prices: {}};
            }

            this.empty = Object.keys(this.eans).length == 0;
        },

        removeEan(ean) {
            if(this.eans[ean]) {
                delete this.eans[ean];
            }
            this.empty = Object.keys(this.eans).length == 0;
        }
    }
});