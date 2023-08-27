<script>
export default {
    name: 'TogglerBtn',
    props: {
        active: {
            type: Boolean,
            required: false,
            default: false
        },
        disabled: {
            type: Boolean,
            required: false,
            default: false
        }
    }
}
</script>

<template>
    <div :class="{ active, disabled }">
        <span>{{ active ? '✔️' : '❌' }}</span>
        <slot />
    </div>
</template>

<style scoped>
div {
    border-radius: 20px;
    padding: 5px 15px;
    border: 1px solid black;
    background-color: tomato;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 3px;
    cursor: pointer;
    user-select: none;
    color: white;
    filter: brightness(.85);
}

div:hover {
    filter: brightness(1);
}

.active {
    background-color: yellowgreen;
    color: black;
}

.disabled {
    background-color: gray;
}
</style>