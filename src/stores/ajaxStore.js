import { defineStore } from "pinia";

import { useMessageStore } from "./messageStore";
import { useConfigStore } from "./configStore";
import { useEanStore } from "./eanStore";

// const messageStore = useMessageStore();


export const useAjaxStore = defineStore('ajaxStore', {
    state() {
        return {
            checkingIfFinishedInterval: null,
            messageStore: useMessageStore(),
            configStore: useConfigStore(),
            eanStore: useEanStore(),
            threads: {}
        }
    },

    actions: {

        rand(min, max) {
            return Math.floor(Math.random() * (max - min)) + min;
        },

        initThread(bookstore) {
            if (!this.threads[bookstore]) {
                this.threads[bookstore] = {
                    name: bookstore,
                    interval: null,
                    lastReq: null,
                    queue: []
                };
            }
        },

        isLocked(thread) {
            if (!thread.lastReq) return false;

            const now = Date.now();

            const delay = this.rand(
                this.configStore.bookstores[thread.name].delays.min * 1000,
                this.configStore.bookstores[thread.name].delays.max * 1000
            );

            return now <= thread.lastReq + delay;
        },

        lock(thread) {
            thread.lastReq = Date.now();
        },

        runThreads() {
            if (this.checkingIfFinishedInterval) return;

            for (const bookstore of Object.values(this.configStore.bookstores)) {
                if (!this.threads[bookstore.name] && (bookstore.download.default.value || bookstore.download.google.value)) {
                    this.initThread(bookstore.name);
                }
            }

            const threads = Object.values(this.threads);

            if (!threads.length) return;


            for (const thread of threads) {
                // this.messageStore.addMessage('success', `Pobieranie cen dla ${thread.name} rozpoczęte...`);

                for (const download of Object.values(this.configStore.bookstores[thread.name].download)) {
                    if (download.value && download.strategy) {
                        for (const ean of Object.values(this.eanStore.eans)) {
                            thread.queue.push({strategy: download.strategy, data: {ean, thread}});
                        }
                    }
                }

                thread.interval = setInterval(() => {
                    if (!thread.queue.length) {
                        // this.messageStore.addMessage('success', 'Zakończono pobieranie dla ' + thread.name);
                        clearInterval(thread.interval);
                        thread.interval = null;
                    } else if (!this.isLocked(thread) && this.configStore.bookstores[thread.name].download.default.value) {
                        const { strategy, data } = thread.queue.shift();

                        strategy(data);
                        this.lock(thread);
                    }
                }, 1000);
            }

            this.checkingIfFinishedInterval = setInterval(() => {
                if (!Object.values(this.threads).filter(thread => thread.interval).length) {
                    this.messageStore.addMessage('success', 'Pobieranie cen zakończone powodzeniem.');
                    clearInterval(this.checkingIfFinishedInterval);
                    this.checkingIfFinishedInterval = null;
                }
            }, 1000);
        },

        pauseThreads() {
            for (const thread of Object.values(this.threads)) {
                clearInterval(thread.interval);
                thread.interval = null;
            }

            clearInterval(this.checkingIfFinishedInterval);
            this.checkingIfFinishedInterval = null;
        }
    }
});