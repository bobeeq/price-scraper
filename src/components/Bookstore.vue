<script>
export default {
    name: 'Bookstore',


    props: [
        'bookstore',
    ],


    data() {
        return {
            active: false,
            withGoogle: false
        }
    },


    methods: {
        toggleGoogle() {
            this.withGoogle = !this.withGoogle;
            if(this.withGoogle) this.active = true;
        },
        toggleActive(){
            this.active = !this.active;
            if(!this.active) {
                this.withGoogle = false;
            }
        }
    }
}
</script>

<template>
    <div class="main" :class="{ active }" @click="toggleActive">
        <h3>{{ bookstore }}</h3>
        <div
            class="google-toggler"
            :class="{ 'with-google': withGoogle }"
            @click.stop="toggleGoogle"
        >
            Google
        </div>
    </div>
</template>


<style scoped>

.main {
    border: 2px solid black;
    border-radius: 20px;
    margin: 20px;
    padding: 20px;
    display: flex;
    flex-direction: column;
    gap: 20px;
    background-color: black;
    opacity: .3;
    cursor: pointer;
    user-select: none;
}

h3 {
    text-align: center;
}

.main:hover {
    opacity: .6;
}

.main.active {
    opacity: 1;
}
.google-toggler {
    border-radius: 10px;
    border: 2px solid black;
    text-align: center;
    background-color: #d9534f;
    color: white;
    padding: 20px;
    cursor: pointer;
    user-select: none;
    filter: brightness(.9);
}

.google-toggler:hover {
    filter: brightness(1.5);
}

.google-toggler.with-google {
    background-color: green;
}
</style>