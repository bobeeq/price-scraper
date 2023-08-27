import { defineStore } from 'pinia';

export const useMessageStore = defineStore('messageStore', {
    state() {
        return {
            messages: [],
            newMessage: false,
        }
    },
    actions: {
        addMessage(type, msg, optionals) {
            this.messages.unshift({type, msg, ...optionals, time: (new Date()).toLocaleString('pl-PL').replace(/\d+\.\d+\.\d+, /, '')});
            this.setNewMessageState(true);
        },
        deleteMessage(message) {
            this.messages.splice(this.messages.indexOf(message), 1);
        },
        setNewMessageState(val) {
            this.newMessage = val;
        },
        deleteAll() {
            this.messages = [];
        }
    }
});