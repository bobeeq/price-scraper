import { defineStore } from 'pinia';

export const useConfigStore = defineStore('configStore', {
    state() {
        return {
            auth: false,
            bookstores: {
                gandalf: {
                    name: 'gandalf',
                    delays: {
                        min: 5,
                        max: 7
                    },
                    productPages: {},
                    download: {
                        default: {
                            value: false,
                            async strategy(data) {
                                const {ean, thread} = data;
                                const res = await fetch(`https://www.gandalf.com.pl/sxa/${ean.code}`, {credentials: 'include', mode: 'cors'});
                                const text = await res.text();
                                const dom = (new DOMParser()).parseFromString(text, 'text/html');

                                const price = dom.querySelector('ul.internal-list span.current-price.f-20.bold-700')?.textContent.trim().replaceAll(/[^\d,]/g, '');

                                const urlToProduct = dom.querySelector('ul.internal-list .info-box a:first-child')?.href;
                                useConfigStore().bookstores['gandalf'].productPages[ean.code] = urlToProduct;
                                if(!ean.prices[thread.name]) {
                                    ean.prices[thread.name] = {};
                                }
                                ean.prices[thread.name].default = price;
                            }
                        },
                        google: {
                            value: false,
                            async strategy(data) {
                                const {ean, thread} = data;
                                const url = useConfigStore().bookstores['gandalf'].productPages[ean.code];

                                if(!url) return;
                                const sign = url.match(/\?/) ? '&' : '?';
                                const res = await fetch(`${url}${sign}utm_source=google`, {credentials: 'include', mode: 'cors'});
                                const text = await res.text();
                                const dom = (new DOMParser()).parseFromString(text, 'text/html');

                                const price = dom.querySelector('.internal-price-box .current-price strong')?.textContent.trim().replaceAll(/[^\d,]/g, '');

                                if(!ean.prices[thread.name]) {
                                    ean.prices[thread.name] = {};
                                }
                                ean.prices[thread.name].google = price;
                            }
                        }
                    },
                    searchURL: ``,
                },
                bonito: {
                    name: 'bonito',
                    delays: {
                        min: 2,
                        max: 4
                    },
                    download: {
                        default: {
                            value: false,
                        },
                        google: {
                            value: false,
                        }
                    },
                    searchURL: ``,
                },
                tantis: {
                    name: 'tantis',
                    delays: {
                        min: 2,
                        max: 4
                    },
                    download: {
                        default: {
                            value: false,
                        },
                        google: {
                            value: false,
                        }
                    },
                    searchURL: ``,
                },
                'świat_książki': {
                    name: 'świat_książki',
                    delays: {
                        min: 2,
                        max: 4
                    },
                    download: {
                        default: {
                            value: false,
                        },
                        google: {
                            value: false,
                        }
                    },
                    searchURL: ``,
                },
                empik: {
                    name: 'empik',
                    delays: {
                        min: 2,
                        max: 4
                    },
                    download: {
                        default: {
                            value: false,
                        },
                        google: {
                            value: false,
                        }
                    },
                    searchURL: ``,
                },
            },
        }
    },
    actions: {
        activateDownload(bookstore, type) {
            if(this.canBeDownloaded(bookstore, type)) {
                this.bookstores[bookstore].download[type].value = true;
            }
        },
        deactivateDownload(bookstore, type) {
            this.bookstores[bookstore].download[type].value = false;
        },
        canBeDownloaded(bookstore, type) {
            return this.bookstores[bookstore].download[type].strategy;
        },
        isDownloading(bookstore, type) {
            return this.bookstores[bookstore].download[type].value;
        },
        isBookstoreActive(bookstore) {
            return this.bookstores[bookstore].download['default'].value
                || this.bookstores[bookstore].download['google'].value
        },
    },

    getters: {
        anythingToDownload() {
            for(const bookstore of Object.values(this.bookstores)) {
                for(const download of Object.values(bookstore.download)) {
                    if(download.value) return true;
                }
            }

            return false;
        }
    }
});