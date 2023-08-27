import { defineStore } from 'pinia';

export const useConfigStore = defineStore('configStore', {
    state() {
        return {
            bookstores: {
                gandalf: {
                    name: 'Gandalf',
                    download: {
                        default: {
                            possible: true,
                            value: false,
                        },
                        google: {
                            possible: true,
                            value: false,
                        }
                    },
                    searchURL: ``,
                },
                bonito: {
                    name: 'Bonito',
                    download: {
                        default: {
                            possible: true,
                            value: false,
                        },
                        google: {
                            possible: false,
                            value: false,
                        }
                    },
                    searchURL: ``,
                },
                tantis: {
                    name: 'Tantis',
                    download: {
                        default: {
                            possible: true,
                            value: false,
                        },
                        google: {
                            possible: true,
                            value: false,
                        }
                    },
                    searchURL: ``,
                },
                'świat_książki': {
                    name: 'Świat Książki',
                    download: {
                        default: {
                            possible: true,
                            value: false,
                        },
                        google: {
                            possible: true,
                            value: false,
                        }
                    },
                    searchURL: ``,
                },
                empik: {
                    name: 'Empik',
                    download: {
                        default: {
                            possible: true,
                            value: false,
                        },
                        google: {
                            possible: false,
                            value: false,
                        }
                    },
                    searchURL: ``,
                },
            },
            eans: {
                
            }
        }
    },
    actions: {
        activateDownload(bookstore, type) {
            if(this.bookstores[bookstore].download[type].possible) {
                this.bookstores[bookstore].download[type].value = true;
            }
        },
        deactivateDownload(bookstore, type) {
            this.bookstores[bookstore].download[type].value = false;
        },
        canBeDownloaded(bookstore, type) {
            return this.bookstores[bookstore].download[type].possible;
        },
        isDownloading(bookstore, type) {
            return this.bookstores[bookstore].download[type].value;
        },
        isBookstoreActive(bookstore) {
            return this.bookstores[bookstore].download['default'].value
                || this.bookstores[bookstore].download['google'].value
        }
    }
});