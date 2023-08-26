import { defineStore } from 'pinia';

export const useMessageStore = defineStore('messageStore', {
    state() {
        return {
            messages: [],
            newMessage: false,
        }
    },
    actions: {
        addMessage(type, msg) {
            this.messages.push({type, msg});
            this.setNewMessageState(true);
        },
        deleteMessage(message) {
            this.messages.splice(this.messages.indexOf(message), 1);
        },
        setNewMessageState(val) {
            this.newMessage = val;
        }
    }
});