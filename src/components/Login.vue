<script>
import { useConfigStore } from '@/stores/configStore';
import { useMessageStore } from '@/stores/messageStore';


export default {
    name: 'Login',
    data() {
        return {
            password: '',
            messageStore: useMessageStore(),
            configStore: useConfigStore()
        }
    },

    methods: {
        doLogin() {
            if(this.password === 'gloselowiec') {
                localStorage.setItem('auth', '6ec58d2f6c08aa9ec5eb84db49281b4c');
                this.configStore.auth = true;
            } else {
                localStorage.removeItem('auth');
                this.messageStore.addMessage('danger', 'Hasło nieprawidłowe. Spróbuj ponownie.');
                this.password = '';
            }
        }
    }
}
</script>

<template>
    <div class="login-box">
        <!-- gloselowiec -->
        <span>Hasło</span>
        <input type="password" autofocus v-model="password" @keyup.enter="doLogin">
        <button @click="doLogin">Zaloguj</button>
    </div>
</template>

<style scoped>
.login-box {
    max-width: 400px;
    margin: auto;
    display: flex;
    flex-flow: column;
    gap: 20px;
}

.login-box * {
    padding: 5px;
    font-size: 1.3em;
    text-align: center;
}

.login-box span {
    text-align: center;
}
</style>