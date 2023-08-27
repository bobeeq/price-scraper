import { defineStore } from "pinia";

import { useMessageStore } from "./messageStore";
import { useConfigStore } from "./configStore";

// const messageStore = useMessageStore();


export const useAjaxStore = defineStore('ajaxStore', {
    state() {
        return {
            isFinishedInterval: null,
            messageStore: useMessageStore(),
            configStore: useConfigStore(),
            threads: {
                tantis: {
                    name: 'tantis',
                    interval: null,
                    lastReq: null,
                    minDelay: 1,
                    maxDelay: 2,
                    queue: [
                        { callback: (data, thread) => console.log(data, thread.name), data: 'raz' },
                        { callback: (data, thread) => console.log(data, thread.name), data: 'dwa' },
                        { callback: (data, thread) => console.log(data, thread.name), data: 'trzy' },
                        { callback: (data, thread) => console.log(data, thread.name), data: 'cztery' },
                        { callback: (data, thread) => console.log(data, thread.name), data: 'pięć' },
                        { callback: (data, thread) => console.log(data, thread.name), data: 'sześć' },
                    ]
                },
                bonito: {
                    name: 'bonito',
                    interval: null,
                    lastReq: null,
                    minDelay: 3,
                    maxDelay: 6,
                    queue: [
                        { callback: (data, thread) => console.log(data, thread.name), data: 'raz' },
                        { callback: (data, thread) => console.log(data, thread.name), data: 'dwa' },
                        { callback: (data, thread) => console.log(data, thread.name), data: 'trzy' },
                        { callback: (data, thread) => console.log(data, thread.name), data: 'cztery' },
                        { callback: (data, thread) => console.log(data, thread.name), data: 'pięć' },
                        { callback: (data, thread) => console.log(data, thread.name), data: 'sześć' },
                        { callback: (data, thread) => console.log(data, thread.name), data: 'siedem' },
                        { callback: (data, thread) => console.log(data, thread.name), data: 'osiem' },
                        { callback: (data, thread) => console.log(data, thread.name), data: 'dziewięc' },
                        { callback: (data, thread) => console.log(data, thread.name), data: 'dziesięć' },
                        { callback: (data, thread) => console.log(data, thread.name), data: 'jedenaście' },
                        { callback: (data, thread) => console.log(data, thread.name), data: 'dwanaście' },
                        { callback: (data, thread) => console.log(data, thread.name), data: 'trzynaście' },
                        { callback: (data, thread) => console.log(data, thread.name), data: 'czternaście' },
                    ]
                },
                empik: {
                    name: 'empik',
                    interval: null,
                    lastReq: null,
                    minDelay: 5,
                    maxDelay: 7,
                    queue: [
                        { callback: (data, thread) => console.log(data, thread.name), data: 'raz' },
                        { callback: (data, thread) => console.log(data, thread.name), data: 'dwa' },
                        { callback: (data, thread) => console.log(data, thread.name), data: 'trzy' },
                        { callback: (data, thread) => console.log(data, thread.name), data: 'cztery' },
                        { callback: (data, thread) => console.log(data, thread.name), data: 'pięć' },
                        { callback: (data, thread) => console.log(data, thread.name), data: 'sześć' },
                        { callback: (data, thread) => console.log(data, thread.name), data: 'siedem' },
                        { callback: (data, thread) => console.log(data, thread.name), data: 'osiem' },
                        { callback: (data, thread) => console.log(data, thread.name), data: 'dziewięć' },
                    ]
                }
            }
        }
    },

    actions: {

        rand(min, max) {
            return Math.floor(Math.random() * (max - min)) + min;
        },


        isLocked(thread) {
            if (!thread.lastReq) return false;

            const now = Date.now();
            const delay = this.rand(thread.minDelay * 1000, thread.maxDelay * 1000);
            return now <= thread.lastReq + delay;
        },

        lock(thread) {
            thread.lastReq = Date.now();
        },

        startAjaxes() {
            if(this.isFinishedInterval) return;
            const threads = Object.values(this.threads);
            if(!threads.length) return;


            for (const thread of threads) {
                thread.interval = setInterval(() => {
                    if (!thread.queue.length) {
                        this.messageStore.addMessage('success', 'Zakończono pobieranie dla ' + thread.name);
                        clearInterval(thread.interval);
                        thread.interval = null;
                    } else if (!this.isLocked(thread) && this.configStore.bookstores[thread.name].download.default.value) {
                        const { callback, data } = thread.queue.shift();

                        callback(data, thread);
                        this.lock(thread);
                    }
                }, 1000);
            }

            this.isFinishedInterval = setInterval(() => {
                if(!Object.values(this.threads).filter(thread => thread.interval).length) {
                    this.messageStore.addMessage('success', 'Pobieranie cen zakończone powodzeniem.');
                    clearInterval(this.isFinishedInterval);
                    this.isFinishedInterval = null;
                }
            }, 1000);
        },

        stopAjaxes() {
            for (const thread of Object.values(this.threads)) {
                clearInterval(thread.interval);
                thread.interval = null;
            }

            clearInterval(this.isFinishedInterval);
            this.isFinishedInterval = null;
        }
    }
});